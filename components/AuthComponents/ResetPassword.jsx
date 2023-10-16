import { useNavigation, useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { Box, Button, Center, FormControl, Heading, Icon, Input, Pressable, VStack } from 'native-base';
import React from 'react'
import GradientView from '../GradientView';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ResetPassword = () => {
  const [code, setCode] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = React.useState(false);
  const [show, setShow] = React.useState(false)
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


  return <GradientView isLoginPage={true}> <Center justifyContent="flex-start" w="100%" h="full" backgroundColor='#1A1D21'>
    <Box safeArea p="2" w="90%" maxW="400" py="8">
      <Heading size="lg" fontWeight="600"  >
        Reset Password
      </Heading>
      <VStack space={3} mt="5">
        <FormControl isInvalid={formSubmitted && !code}>
          {/* <FormControl.Label color="amber.400">Verification Code</FormControl.Label> */}
          <Input onChangeText={setCode} value={code} placeholder='Verification Code' fontSize='16'
            InputLeftElement={<Icon as={<MaterialIcons name='onepassword' />} size={5} ml="2" color="muted.400" />} />
        </FormControl>
        <FormControl isInvalid={formSubmitted && !newPassword}>
          <FormControl.Label color="amber.400">New Password</FormControl.Label>
          <Input onChangeText={setNewPassword} value={newPassword} fontSize='16'
            type={show ? "text" : "password"} InputLeftElement={<Icon as={<MaterialIcons name='lock' />} size={5} ml="2" color="muted.400" />} InputRightElement={<Pressable onPress={() => setShow(!show)}  >
              <Icon as={<MaterialIcons name={show ? "eye" : "eye-off"} />} size={5} mr="2" color="muted.400" />
            </Pressable>} placeholder="Password" />
        </FormControl>
        <Button mt="2" colorScheme="indigo" onPress={() => handleSubmit()} >
          {loading ? ' loading...' : 'Resend Code'}
        </Button>
      </VStack>
    </Box>
  </Center></GradientView>;
};

export default ResetPassword