import { useNavigation, useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { Box, Button, Center, FormControl, Heading, Input, VStack } from 'native-base';
import React from 'react'

const ResetPassword = () => {
  const [code, setCode] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = React.useState(false);

  const navigator = useNavigation()
  const route = useRoute()
  const { email } = route.params


  const handleSubmit = () => {
    setFormSubmitted(true);
    if (code && email && newPassword) {
      setLoading(true);
      Auth.forgotPasswordSubmit(email, code, newPassword)
        .then(() => {
          setLoading(false);
          alert('Password reset successfully');
        })
        .catch((err) => {
          setLoading(false);
          alert(err.message);
        })
    }
  }


  return <Center w="100%" backgroundColor='info.600'>
    <Box p="2" py="8" w="90%" minH="full" maxW="400">
      <Heading size="lg" fontWeight="600" color="white" >
        Reset Password
      </Heading>
      <VStack space={3} mt="5">
        <FormControl color="white" isInvalid={formSubmitted && !code}>
          <FormControl.Label color="amber.400">Verification Code</FormControl.Label>
          <Input onChangeText={setCode} value={code} />
        </FormControl>
        <FormControl color="white" isInvalid={formSubmitted && !newPassword}>
          <FormControl.Label color="amber.400">New Password</FormControl.Label>
          <Input onChangeText={setNewPassword} value={newPassword} />
        </FormControl>
        <Button mt="2" colorScheme="indigo" onPress={() => handleSubmit()} >
          {loading ? ' loading...' : 'Resend Code'}
        </Button>
      </VStack>
    </Box>
  </Center>;
};

export default ResetPassword