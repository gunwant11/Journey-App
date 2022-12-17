import { API } from 'aws-amplify'
import { Avatar, Box, Button, Center,  HStack,Text } from 'native-base'
import React, { Fragment, useEffect } from 'react'
import useAppContext from '../store/userContext';

const Home = () => {

  const { createJourney, getJourney  } = useAppContext();

  const createJourneyHandler = async () => {
    await createJourney('title111', 'description111', 'content1')
  }

  const getJourneyHandler = async () => {
    await getJourney()
  }

 
  return (
    <Box w="100%" h="full" px={5} py={5} background="#27143D">
      <HStack justifyContent="space-between" w="100%" top='0'>
        <Box>
          <Text fontSize={12} fontStyle='' >Morning</Text>
          <Text  fontSize={18} fontWeight={600}>Elixabeth</Text>
        </Box>
        <Avatar size="md" source={{
          uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        }} />
      </HStack>
      <Box>
        <Button onPress={() => createJourneyHandler()} >Create Journey</Button>
        <Button onPress={() => getJourneyHandler()} >Get Journey</Button>
      </Box>

    </Box>
  )
}

export default Home