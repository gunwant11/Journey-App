import React, { useReducer } from 'react'
import { Box, Center, HStack, Heading, ScrollView, Text, VStack, View } from 'native-base';
import useAppContext from '../store/userContext';
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import NoteCard from '../components/NoteCard';
import userReducer from '../store/userReducer';
import { useNavigation, useRoute } from '@react-navigation/native';
import Tabs from '../components/Tabs';

export const Journal = () => {

  const { getJourney, journeys , deleteJourney, getJourneyByCategory  } = useAppContext();

  
  const router = useRoute()
  const navigation = useNavigation();
  const category  = router?.params?.category
  const [currentCategory, setCurrentCategory] = React.useState(category || 'all')

  useEffect(() => {
    setCurrentCategory(category)
    if(category){
      getJourneyByCategory(category)
    }else{
    getJourney()
    }

  }, [router])

  useEffect(() => {

    console.log("journeys", journeys, journeys?.length )
   
  }, [journeys])

  return (
    <SafeAreaView>
      <View pt={10} h='full' width='100%' >
        <Box px={5} w="full"  >

          <Icon name="arrowleft" size={30} color="#1A1D21" />
          <Text fontSize={30} fontFamily="mono" fontWeight="700" color="#1A1D21" >
            {currentCategory || 'all'} journeys
          </Text>
          {/* button to delete */}
          {/* <Icon name="delete" size={30} color="#1A1D21" onPress={()=> deleteJourney("d06c18ab-4bf5-46e9-a603-ee30fe2326a5", "1664548912797") } /> */}
          {/* button to get all notes */}
          {/* <Icon name="search1" size={30} color="#1A1D21" onPress={()=> getJourney() } /> */}
        </Box>
        <Box px={5} w="full" >
          <ScrollView   >
            <Tabs setCurrentCategory={setCurrentCategory}  />
            </ScrollView>
            </Box>
        <Box  >
          <ScrollView   >
            <VStack space={2} px={2} pt="5" w="full" pb={200} >
              <HStack space={2} mx="1" >
                <VStack space={2} w="1/2" >
                {journeys?.slice(0, 2).map((journey, index) => (
                  <TouchableOpacity key={index} 
                  onPress={()=> navigation.navigate('AddNote',{
                    selectedJourney: journey,
                  } ) }
                  >
                    
                  <VStack key={index} justifyContent="space-between" p="3" px='5'  bg="#d7dede" height="48" rounded="2xl" shadow={3} opacity='0.8'  >
                    <Text color="black" fontSize="lg" fontWeight={900}  >
                    {journey?.title}
                    </Text>
                    <Text color="#717676"  >
                    {journey?.description}
                    </Text>
                  </VStack>
                    </TouchableOpacity>
                ))}

                </VStack>
                {/* <NoteCard accentCard={true}/> */}
                
                {journeys?.slice(2, 3).map((journey, index) => (
      
                <Box
                  onPress={()=> navigation.navigate('AddNote',{
                  selectedJourney: journey,
                })}
                key={index} justifyContent="space-between" p="3" w="1/2" px='5' bg="#1A1D21" rounded="2xl" shadow={3} opacity='0.8'  >
                  <Text color="white" fontSize="lg" fontWeight={900}  >
                    {journey?.title}
                  </Text>
                  <Text color="#717676"  >
                    {journey?.description}
                  </Text>
                </Box>
         
         ) )}
              </HStack>
              {/* rest of journies */}
              {journeys?.slice(3, journeys?.length).map((journey, index) => (
                <NoteCard
                  journey={journey}
                  accentCard={false}
                  title={journey?.title}
                  description={journey?.description}
                  key={index}
                  journeyId={journey?.journeyId}
                />
              ))
              }
            
            </VStack>
          </ScrollView>
        </Box>
      </View>
    </SafeAreaView>
  )
}

