
import React from 'react'
import useAppContext from '../store/userContext';
import { View, Text, HStack } from 'native-base';

const Tabs = ({setCurrentCategory}) => {

  
  const { categories, getJourneyByCategory,getJourney } = useAppContext();

  return (
    <View>
      <HStack 

      space={3}

      >
        <Text px={4} py={1} bg="gray.300" borderWidth={2} border borderColor="gray.400" onPress={()=>{
          setCurrentCategory('all')
          getJourney()
        }}  borderRadius={15} >All</Text>
      {categories?.map((category, index) => (

        <Text px={4} py={1} bg="gray.300" borderWidth={2} border borderColor="gray.400"  borderRadius={15} key={index} onPress={()=> {getJourneyByCategory(category.category) 
          setCurrentCategory(category.category)
        }} >{category.category}</Text>       
        ))
      }
      </HStack>
    </View>
  )
}

export default Tabs