import { API } from 'aws-amplify'
import { Avatar, Box, Button, Center,  HStack,Text } from 'native-base'
import React, { Fragment, useEffect } from 'react'
import useAppContext from '../store/userContext';

export const Home = () => {

  const { createJourney, getJourney  } = useAppContext();

  const createJourneyHandler = async () => {
    await createJourney('title111', 'description111', 'content1')
  }

  const getJourneyHandler = async () => {
    await getJourney()
  }

 
  return (
    <Box w="100%" h="full" px={5} py={5} background="#1A1D21">
      <HStack alignItems="center" w="100%" top='0'>
        <Avatar size="md" marginRight='3' source={{
          uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        }} />
        <Box>
          <Text color="white"  >Welcome</Text>
          <Text  fontSize={20}  color="white" lineHeight="sm" fontWeight="bold">Elizabeth</Text>
        </Box>
      </HStack>
      {/* <Box>
        <Button onPress={() => createJourneyHandler()} >Create Journey</Button>
        <Button onPress={() => getJourneyHandler()} >Get Journey</Button>
      </Box> */}

    </Box>
  )
}

