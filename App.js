import { extendTheme, NativeBaseProvider,  } from "native-base";
import React from 'react';
import { Amplify, API } from 'aws-amplify'
import awsconfig from './src/aws-exports.js'
import Navigation from "./screens/navigation/Navigation.js";
import { UserProvider } from "./store/userContext";
import { useFonts } from 'expo-font';
import { ActivityIndicator } from "react-native";
Amplify.configure({  ...awsconfig,  Analytics: {disabled: true,}, API: { endpoints: [ { 
  name: "journeyapp", 
  endpoint: "https://66wbbuf0j5.execute-api.ap-south-1.amazonaws.com/dev/", 
  region: "ap-south-1",
  path: '/user/{userId}',
} ] } })
API.configure(awsconfig);

// 291440
function App() {

  const [loaded] = useFonts({
    'Euclid-Circular-B-Regular': require('./assets/fonts/Euclid-Circular-B-Regular.ttf'),
    'Euclid-Circular-B-Medium': require('./assets/fonts/Euclid-Circular-B-Medium.ttf'),
    'Euclid-Circular-B-SemiBold': require('./assets/fonts/Euclid-Circular-B-SemiBold.ttf'),
    'Euclid-Circular-B-Bold': require('./assets/fonts/Euclid-Circular-B-Bold.ttf'),
  
  });

  const theme = extendTheme({
    fontConfig: {
      Euclid: {
        400: {
          normal: 'Euclid-Circular-B-Regular',
        },
        500: {
          normal: 'Euclid-Circular-B-Medium',
        },
        700: {
          normal: 'Euclid-Circular-B-SemiBold',
        },
        900: {
          normal: 'Euclid-Circular-B-Bold',
        },
      },
    },
    fonts: {
      heading: 'Euclid-Circular',
      body: 'Euclid-Circular',
      mono: 'Euclid-Circular',
    },
  });

  if(!loaded){
    return <ActivityIndicator/>
  }



  return (
    <NativeBaseProvider >
      <UserProvider>
        <Navigation/>
      </UserProvider>
    </NativeBaseProvider>
  );
}


export default (App)
