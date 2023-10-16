import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { Box, Button, Center, FormControl, Heading,  Icon,  Input,  VStack } from 'native-base';
import React from 'react'
import GradientView from '../GradientView';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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




  return <GradientView isLoginPage={true}><Center justifyContent="flex-start"  w="100%" h="full" >
  <Box safeArea p="2" w="90%" py="8">
      <Heading size="lg" fontWeight="600"  >
       Reset Password
      </Heading>
      <VStack space={3} mt="5">
        <FormControl color="white" isInvalid={formSubmitted && !email}>
          {/* <FormControl.Label color="amber.400">Email</FormControl.Label> */}
          <Input  borderWidth={0} backgroundColor="rgba(255, 255, 255, 0.3)"  onChangeText={setEmail} value={email}  placeholder='Email' fontSize='16'
              InputLeftElement={<Icon as={<MaterialIcons name='email' />} size={5} ml="2" color="muted.400" />} />
        </FormControl>
        <Button mt="2" colorScheme="indigo"  onPress={()=> handleSubmit()} >
          {loading ? ' loading...' : 'Resend Code'}
        </Button>
      </VStack>
    </Box>
  </Center></GradientView>;
};

export default ForgotPassword