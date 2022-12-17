import { Box, Center, Fab, Input, Text, TextArea } from 'native-base'
import React from 'react'
import useAppContext from '../../store/userContext'

const CreateNote = () => {

  const [note, setNote] = React.useState('')
  const [journeyTitle, setJourneyTitle] = React.useState('Your free thoughts');
  const [editMode, setEditMode]  = React.useState(false);
  const { createJourney, createJourneyLoading  } = useAppContext()

  const handleCreateJourney = () => {
    if(note && journeyTitle){
      createJourney(journeyTitle, note, note)
    }
  }

  return (
    <Center backgroundColor='blue.400' width='100%' py='12' px="8">
      <Box>
        <Text color='white' fontSize='xs' fontWeight='medium' textAlign="center" >
                Welcome To Journal 
        </Text>
        <Text onChangeTex color='white' fontSize='2xl' fontWeight='bold' >
                Your free thoughts
        </Text>
        <Input onChangeText={setJourneyTitle} value={journeyTitle} onChangeTex color='white' fontSize='2xl' fontWeight='bold'  >
        </Input>
       
      </Box>
      <Box maxW='500px' width='100%'>
        <Text color='white' mt='6' mb='2' fontSize='xs' width="100%" >
          {Date.toString()}
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

      <Fab renderInPortal={false} shadow={2} size="sm" label="Complete" onPress={handleCreateJourney}  py='2' />
    </Center>
  )
}

export default CreateNote