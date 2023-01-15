import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { Box, Button, Center, FormControl, Heading, HStack, Input, Link, Text, VStack } from 'native-base';
import React from 'react'
import useAppContext from '../../store/userContext';

const SignIn = ({setNewUser}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [fromSubmitted, setFormSubmitted] = React.useState(false)
  const {setUser} = useAppContext ()

  const navigation = useNavigation()

  const handleSignIn = async () => {
    setFormSubmitted(true)
    if(email && password ){
      setLoading(true)
      try{
        const user = await Auth.signIn(email, password)
          .then(data => {

            setUser(data)
            setLoading(false)
            navigation.navigate('Home')
          })
      }
      catch (error) {
        console.log('error signing in', error)
        alert(error.message)
        setLoading(false)
      }

    }
  }


  return <Center w="100%" backgroundColor='primary.500'>
    <Box  p="2" py="8" w="90%" minH="full" maxW="400">
      <Heading size="lg" fontWeight="600" color="white" >
            Welcome
      </Heading>
      <Heading mt="1"  color="white" fontWeight="medium" size="xs">
            Sign in to continue!
      </Heading>
  
      <VStack space={3} mt="5">
        <FormControl isRequired  isInvalid={fromSubmitted && !email} color="white">
          <FormControl.Label color="amber.400">Email ID</FormControl.Label>
          <Input onChangeText={setEmail} value={email} />
          <FormControl.ErrorMessage  color="red.500">Email is required</FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={fromSubmitted && !password }>
          <FormControl.Label color="white" >Password</FormControl.Label>
          <Input type="password" onChangeText={setPassword} value={password} />
          <FormControl.ErrorMessage  color="red.500">Password is required</FormControl.ErrorMessage>
          <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1"
          onPress={() => navigation.navigate('ForgotPassword')}
          >
              Forget Password?
          </Link>
        </FormControl>
        <Button mt="2" colorScheme="indigo" onPress={()=> handleSignIn()} >
          {loading ? ' loading...' : 'Sign in'}
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm" color="white" _dark={{
            color: "white"
          }}>
                I&apos; m a new user.{" "}
          </Text>

          <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} 
          onPress={()=>setNewUser(true)}
          >
                Sign Up
          </Link>
        </HStack>
      </VStack>
    </Box>
  </Center>;
};
export default SignIn