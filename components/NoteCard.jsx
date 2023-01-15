
import React from 'react'
import { VStack,View, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const NoteCard = ({accentCard , title, description, journeyId, journey }) => {

 const navigation = useNavigation();


  return (
    <TouchableOpacity onPress={()=> navigation.navigate('AddNote',{
      selectedJourney: journey,
    } ) } >
    <VStack p="3" px='5' justifyContent="space-between" bg={accentCard? '#1A1D21' : "#d7dede"} rounded="2xl" height="48" shadow={3} opacity='0.8'  >
                <Text color="black" fontSize="lg" fontWeight={900}  >
                  {title}
                </Text>
                <Text color={accentCard ? "white" : "#717676"}  >
                {description} ....
                </Text>
</VStack>
    </TouchableOpacity>
  )
}

export default NoteCard