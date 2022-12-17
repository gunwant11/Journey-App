import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { Box, Button, Center, FormControl, Heading,  Input,  VStack } from 'native-base';
import React from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const navigator = useNavigation()
  const handleSubmit = () => {
    setFormSubmitted(true);
    if(email) {
      try{
        setLoading(true);
        Auth.forgotPassword(email)
          .then(() => {
            setLoading(false);
            alert('Verification code sent to your email');
            navigator.navigate('ResetPassword', {email});
          }).catch((err) => {
            setLoading(false);
            alert(err.message);
          })
      }catch(err){
        setLoading(false);
        alert(err.message);
      }
    }
  
  }




  return <Center w="100%" backgroundColor='info.600'>
    <Box  p="2" py="8" w="90%" minH="full" maxW="400">
      <Heading size="lg" fontWeight="600" color="white" >
       Reset Password
      </Heading>
      <VStack space={3} mt="5">
        <FormControl color="white" isInvalid={formSubmitted && !email}>
          <FormControl.Label color="amber.400">Email</FormControl.Label>
          <Input onChangeText={setEmail} value={email} />
        </FormControl>
        <Button mt="2" colorScheme="indigo"  onPress={()=> handleSubmit()} >
          {loading ? ' loading...' : 'Resend Code'}
        </Button>
      </VStack>
    </Box>
  </Center>;
};

export default ForgotPassword