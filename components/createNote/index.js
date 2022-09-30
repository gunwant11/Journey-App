import { Box, Center, Fab, Input, Text, TextArea } from 'native-base'
import React from 'react'

const CreateNote = () => {

  const [note, setNote] = React.useState('')

  return (
    <Center backgroundColor='blue.400' width='100%' py='12' px="8">
      <Box>
        <Text color='white' fontSize='xs' fontWeight='medium' textAlign="center" >
                Welcome To Journal 
        </Text>
        <Text color='white' fontSize='2xl' fontWeight='bold'>
                Your free thoughts
        </Text>
      </Box>
      <Box maxW='500px' width='100%'>
        <Text color='white' mt='6' mb='2' fontSize='xs' width="100%" >
          10 June 2022
        </Text>
        <TextArea
          //       onFocus={() => {
          //      updateBorderColor({ borderColor: 'white' });
          //    }}
          placeholder='Write your thoughts here......'
          placeholderTextColor='gray.700'
          p='0'
          minHeight='300px'
          width="full" onChangeText={setNote} value={note} color='white' fontSize="sm" borderColor="transparent" outline="none" />
      </Box>

      <Fab renderInPortal={false} shadow={2} size="sm" label="Complete"  py='2' />
    </Center>
  )
}

export default CreateNote