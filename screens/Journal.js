import React from 'react'
import { Box, Center, HStack, Heading, ScrollView, Text, VStack, View } from 'native-base';
import useAppContext from '../store/userContext';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native';
import NoteCard from '../components/NoteCard';

export const Journal = () => {

  const { getJourney, getJourneyLoadingState } = useAppContext();

  const [journeys, setJourneys] = React.useState([
    {
      id: 1,
      title: 'My first journey',
      description: 'This is my first journey',
    },
    {
      id: 2,
      title: 'My second journey',
      description: 'This is my second journey',
    },
    {
      id: 3,
      title: 'My third journey',
      description: 'This is my third journey',
    },
    {
      id: 4,
      title: 'My fourth journey',
      description: 'This is my fourth journey',
    },
  ])
  // journeys reducer

  useEffect(() => {
    getJourney()
  }, [])

  useEffect(() => {
    console.log(getJourneyLoadingState)
  }, [getJourneyLoadingState])

  return (
    <SafeAreaView>
      <View pt={10} h='full' width='100%' >
        <Box px={5} w="full"  >
          <Icon name="arrowleft" size={30} color="#1A1D21" />
          <Text fontSize={30} fontFamily="mono" fontWeight="700" color="#1A1D21" >
            personal notes
          </Text>
        </Box>
        <Box  >
          <ScrollView  >
            <VStack space={2} px={2} pt="5" w="full" alignItems="center">
              <HStack space={2} mx="1" >
                <VStack space={2} w="1/2" >
                  <VStack justifyContent="space-between" p="3" px='5'  bg="#d7dede" height="48" rounded="2xl" shadow={3} opacity='0.8'  >
                    <Text color="black" fontSize="lg" fontWeight={900}  >
                      your free thoughts
                    </Text>
                    <Text color="#717676"  >
                      Ice cream lemon drops cake muffin sweet roll muffin .
                    </Text>
                  </VStack>
                  <VStack justifyContent="space-between" p="3" px='5' bg="#d7dede" rounded="2xl" height="48" shadow={3} opacity='0.8'  >
                    <Text color="black" fontSize="lg" fontWeight={900}  >
                      your free thoughts
                    </Text>
                    <Text color="#717676"  >
                      Ice cream lemon drops cake muffin sweet roll muffin .
                    </Text>
                  </VStack>
                 
                </VStack>
                {/* <NoteCard accentCard={true}/> */}
                <VStack justifyContent="space-between" p="3" px='5' w="1/2" bg="#1A1D21" rounded="2xl" shadow={3} opacity='0.8'  >
                  <Text color="white" fontSize="lg" fontWeight={900}  >
                    your free thoughts
                  </Text>
                  <Text color="#717676"  >
                    Ice cream lemon drops cake muffin sweet roll muffin .
                    Ice cream lemon drops cake muffin sweet roll muffin .
                    Ice cream lemon drops cake muffin sweet roll muffin .
                    Ice cream lemon drops cake muffin sweet roll muffin . . . . .
                  </Text>
                </VStack>
              </HStack>
              
              <NoteCard/>
              <NoteCard/>
              <NoteCard/>

            </VStack>
          </ScrollView>
        </Box>
      </View>
    </SafeAreaView>
  )
}

