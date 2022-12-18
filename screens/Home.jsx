import { API } from 'aws-amplify'
import { Avatar, Box, Button, Center, HStack, ScrollView, Text, VStack, View } from 'native-base'
import React, { Fragment, useEffect } from 'react'
import useAppContext from '../store/userContext';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import FolderCard from '../components/FolderCard';

export const Home = () => {

  const { createJourney, getJourney } = useAppContext();
  const createJourneyHandler = async () => {
    await createJourney('title111', 'description111', 'content1')
  }

  const getJourneyHandler = async () => {
    await getJourney()
  }


  return (
    <Box w="100%" h="full" px={2} pt={5} background="#1A1D21">
      <Box paddingX={4} >
        <HStack justifyContent="space-between" paddingY={5} alignItems="center">
          <Text fontSize={34} fontFamily="mono" fontWeight="700" color="white">
            folders
          </Text>
          <Icon name="calendar-month" size={30} color="#fff" />
        </HStack>
      </Box>
      <ScrollView  >
        <VStack space={2} paddingBottom="16" >
          <FolderCard></FolderCard>
          <FolderCard></FolderCard>
          <FolderCard></FolderCard>
          <FolderCard></FolderCard>
          <FolderCard></FolderCard>
          <FolderCard></FolderCard>
          <FolderCard></FolderCard>
        </VStack>
      </ScrollView>
      {/* <Box>
        <Button onPress={() => createJourneyHandler()} >Create Journey</Button>
        <Button onPress={() => getJourneyHandler()} >Get Journey</Button>
      </Box> */}

    </Box>
  )
}

