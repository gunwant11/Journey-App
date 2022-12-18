import { View, Text, VStack } from 'native-base'
import React from 'react'
import { Box, HStack } from 'native-base'
import  Icon  from 'react-native-vector-icons/Entypo'
import { TouchableOpacity } from 'react-native'

const FolderCard = ({category, lenght}) => {
  return (
    <TouchableOpacity>
      <Box borderRadius={20} paddingY={3} paddingX={5}  background="#2d3032" width="full" height="48" >
        <VStack height="full" justifyContent="space-between">
          <HStack  alignItems="center" justifyContent="space-between" >
            <Text color="#a2a2a2">Folder Card</Text>
            <Icon name='chevron-right' color="#fff" size={25}/>
          </HStack>
          <Text color="#fff" fontSize="5xl" fontWeight="black" >47</Text>
        </VStack>
      </Box>
    </TouchableOpacity>
  )
}

export default FolderCard