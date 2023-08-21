/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "journeytable";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = true; // TODO: update in case is required to use that definition
const partitionKeyName = "journeyId";
const partitionKeyType = "S";
const sortKeyName = "createdAt";
const sortKeyType = "S";
const hasSortKey = sortKeyName !== "";
const path = "/user/:userId";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express()
app.use(express.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
  case "N":
    return Number.parseInt(param);
  default:
    return param;
  }
}

/********************************
 * HTTP Get method for list objects *
 ********************************/

// get items and filter by payload
app.post(path + "/journey", function(req, res) {
  const condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [convertUrlType(req.params[partitionKeyName], partitionKeyType)];
    } catch (err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

    let filterExpression = '';
    let expressionAttributeValues = {};
    let expressionAttributeNames = {};

     if (req.body.journeyId) {
    filterExpression += '#journeyId = :journeyId';
    expressionAttributeValues[':journeyId'] = req.body.journeyId;
    expressionAttributeNames['#journeyId'] = 'journeyId';
  }

  if (req.body.createdAt) {
    if (filterExpression) {
      filterExpression += ' AND ';
    }
    filterExpression += '#createdAt = :createdAt';
    expressionAttributeValues[':createdAt'] = req.body.createdAt;
    expressionAttributeNames['#createdAt'] = 'createdAt'; 
  }

  const limit = req.body.limit || 10; // Number of items per page
  const exclusiveStartKey = req.body.lastEvaluatedKey || null;

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition,
    Limit: limit,
    ExclusiveStartKey: exclusiveStartKey

  }

  if (Object.keys(expressionAttributeValues).length > 0) {
    queryParams.ExpressionAttributeValues = expressionAttributeValues;
  }

  if (Object.keys(expressionAttributeNames).length > 0){
    queryParams.ExpressionAttributeNames = expressionAttributeNames;
  }

  if (filterExpression) {
    queryParams.FilterExpression = filterExpression;
  }

  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.json(data.Items);
    }
  });
});



/************************************
* HTTP put method for insert object *
*************************************/

app.put(path, function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
    } else{
      res.json({ success: 'put call succeed!', url: req.url, data: data })
    }
  });
});

/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else {
      res.json({success: 'post call succeed!', url: req.url, data: data})
    }
  });
});

/**************************************
* HTTP remove method to delete object *
***************************************/

// payload
// {"journeyId":"d06c18ab-4bf5-46e9-a603-ee30fe2326a5","createdAt":"1664548912797"}

app.delete(path ,async function  (req, res)  {
  try{
    // asscess payload from request
    var newData = JSON.stringify(req.body)

    const payload = await JSON.parse(newData);
    // get journeyId from payload
    const journeyId = payload.journeyId;
    // get createdAt from payload
    const createdAt = payload.createdAt;

    if(userIdPresent && req.apiGateway){
      req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    }

    if(!journeyId || !createdAt){
      res.statusCode = 500;
      res.json({error: 'journeyId or createdAt is missing', body: req.body});
    }
    

    const params = {
      TableName: tableName,
      Key: {
        journeyId: journeyId,
        createdAt: createdAt
      }
    };

    dynamodb.delete( params , (err, data)=> {
      if (err) {
        res.statusCode = 500;
        res.json({error: err , params: params});
      } else {
        res.json({ data: data, params: params});
      }
    });

  }
  catch(e){
    res.statusCode = 500;
    res.json({error: e.message, url: req.url, body: req.body});
  }
 
});

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app


// /*****************************************
//  * HTTP Get method for get single object *
//  *****************************************/

// // /user/{userId}/{proxy+}



// app.get(path + '/*', function(req, res) {
//   const condition = {}
//   condition[partitionKeyName] = {
//     ComparisonOperator: 'EQ'
//   }

//   if (userIdPresent && req.apiGateway) {
//     condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH];
//   } else {
//     try {
//       condition[partitionKeyName]['AttributeValueList'] = [convertUrlType(req.params[partitionKeyName], partitionKeyType)];
//     } catch (err) {
//       res.statusCode = 500;
//       res.json({error: 'Wrong column type ' + err});
//     }
//   }

//   let queryParams = {
//     TableName: tableName,
//     KeyConditions: condition
//   }

//   dynamodb.scan(queryParams, (err, data) => {
//     if (err) {
//       res.statusCode = 500;
//       res.json({error: 'Could not load items: ' + err});
//     } else {
//       const journeyId = req.params[0]
//       const journey = data.Items.find(journey => journey.journeyId === journeyId);
//       res.json(journey);
//     }
//   });
// });



// app.get(path , function(req, res) {
//   const condition = {}
//   condition[partitionKeyName] = {
//     ComparisonOperator: 'EQ'
//   }

//   if (userIdPresent && req.apiGateway) {
//     condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH];
//   } else {
//     try {
//       condition[partitionKeyName]['AttributeValueList'] = [convertUrlType(req.params[partitionKeyName], partitionKeyType)];
//     } catch (err) {
//       res.statusCode = 500;
//       res.json({error: 'Wrong column type ' + err});
//     }
//   }

//   let queryParams = {
//     TableName: tableName,
//     KeyConditions: condition,
//     ScanIndexForward: false
//   }

//   dynamodb.scan(queryParams, (err, data) => {
//     if (err) {
//       res.statusCode = 500;
//       res.json({error: 'Could not load items: ' + err});
//     } else {
//       res.json(data.Items);
//     }
//   });
// });

