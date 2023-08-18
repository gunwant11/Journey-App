import { Auth } from 'aws-amplify';
import { Box, Button, Center, FormControl, Heading,  Input,  VStack } from 'native-base';
import React from 'react'
import useAppContext from '../../store/userContext';

const ConfirmationEmail = () => {
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { confirmationEmail } = useAppContext();


  const handleConfirm = async ()=>{
    if(code)
    {setLoading(true)
      try{
        const user  = await Auth.confirmSignUp(confirmationEmail, code)
          .then(data => {
            setLoading(false)})
          .catch(err => console.log(err));

      }
      catch(error) {
        console.log('error signing in', error)
        setLoading(false)
      }}
  }


  const handleResend = async ()=>{
    setLoading(true)
    try{
      const user  = await Auth.resendSignUp(confirmationEmail)
        .then(data => {
          setLoading(false)})
        .catch(err => console.log(err));
    }
    catch(error) {
      console.log('error signing in', error)
      setLoading(false)
    }
  }

  return <Center w="100%" backgroundColor='info.600'>
    <Box  p="2" py="8" w="90%" minH="full" maxW="400">
      <Heading size="lg" fontWeight="600" color="white" >
       Email Confirmation
      </Heading>
  
      <VStack space={3} mt="5">
        <FormControl color="white">
          <FormControl.Label color="amber.400">Verification Code</FormControl.Label>
          <Input onChangeText={setCode} value={code} />
        </FormControl>
        <Button mt="2" colorScheme="indigo" onPress={()=> handleConfirm()  } >
          {loading ? ' loading...' : 'Sign in'}
        </Button>
        <Button mt="2" colorScheme="indigo"  onPress={()=> handleResend()} >
          {loading ? ' loading...' : 'Resend Code'}
        </Button>
      </VStack>
    </Box>
  </Center>;
};

export default ConfirmationEmail