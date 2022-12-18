
import React from 'react'
import { VStack,View, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'

const NoteCard = ({accentCard}) => {
  return (
    <TouchableOpacity>
    <VStack p="3" px='5' justifyContent="space-between" bg={accentCard? '#1A1D21' : "#d7dede"} rounded="2xl" height="48" shadow={3} opacity='0.8'  >
                <Text color="black" fontSize="lg" fontWeight={900}  >
                  your free thoughts
                </Text>
                <Text color={accentCard ? "white" : "#717676"}  >
                  Ice cream lemon drops cake muffin sweet roll muffin .
                  Ice cream lemon drops cake muffin sweet roll muffin .
                  Ice cream lemon drops ....
                </Text>
</VStack>
    </TouchableOpacity>
  )
}

export default NoteCard