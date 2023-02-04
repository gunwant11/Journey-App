import { Box, Button, Center, FormControl, Heading, HStack, Input, Link, Text, VStack } from 'native-base';
import React from 'react'
import { Auth } from 'aws-amplify';
import useAppContext from '../../store/userContext';
import { Hub } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
const RegiserUser = ({ setNewUser }) => {
  const { setConfirmationEmail, setUser } =  useAppContext()
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState('')
  const [fromSubmitted, setFormSubmitted] = React.useState(false)


  const navigation = useNavigation()

  const handleSignIn = async ()=>{
    setFormSubmitted(true)
    if(password && confirmPassword && username && email && password === confirmPassword ){
      setLoading(true)
      try{
        const user  = await Auth.signUp({
          password,
          username: email,
          email,
              
          attributes: {
            email,
            name: username,
            preferred_username : username
            // optional
          },
          autoSignIn: { // optional - enables auto sign in after user is confirmed
            enabled: true,
          },
          validationData: [],  //optional
        })
          .then(data => {
        
            setConfirmationEmail(email)
            setUser(data?.user)
            setLoading(false)
            navigation.navigate('ConfirmationEmail')
          })
          .catch(err => console.log(err));
      }
      catch(error) {
        
        alert(error.message)
        setLoading(false)
      }
    }

  }


  return <Center w="100%" h="full" backgroundColor='#1A1D21'>
    <Box safeArea p="2" w="90%" maxW="400" py="8">
      <Heading size="2xl" color="white" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
        Welcome
      </Heading>
      <Heading mt="1" color="white" _dark={{
        color: "white"
      }} fontWeight="medium" size="xs">
        Sign up to continue!
      </Heading>
      <VStack space={3} mt="5">
        <FormControl isRequired isInvalid={fromSubmitted && !username}>
          <FormControl.Label color="white" >UserName</FormControl.Label>
          <Input borderWidth={0} backgroundColor="gray.700"  onChangeText={setUsername} value={username} />
          <FormControl.ErrorMessage   p='0' m='0' color='red' fontSize='xs' > Please enter a username </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={fromSubmitted && !email}>
          <FormControl.Label color="white" >Email</FormControl.Label>
          <Input borderWidth={0} backgroundColor="gray.700"  type='email' onChangeText={setEmail} value={email} />
          <FormControl.ErrorMessage p='0' m='0' color='red' fontSize='xs'> Please enter a email adderss </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={fromSubmitted && !password && password.length > 8 }>
          <FormControl.Label color="white" >Password</FormControl.Label>
          <Input borderWidth={0} backgroundColor="gray.700"  type="password" onChangeText={setPassword} value={password} />
          <FormControl.ErrorMessage  p='0' m='0' color='red' fontSize='xs'> Please enter a valid password </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={fromSubmitted && (!confirmPassword || confirmPassword !== password)}>
          <FormControl.Label color="white" >Confirm Password</FormControl.Label>
          <Input borderWidth={0} backgroundColor="gray.700"  type="password" onChangeText={setConfirmPassword} value={confirmPassword} />
          <FormControl.ErrorMessage  p='0' m='0' color='red' fontSize='xs'> Please enter a valid password </FormControl.ErrorMessage>
        </FormControl>
        <Button mt="2" colorScheme="indigo" onPress={()=>handleSignIn()} >
          {loading ? 'loading...': 'Sign up'}
        </Button>
      </VStack>
      <HStack mt="6" justifyContent="center">
        <Text fontSize="sm" color="white" _dark={{
          color: "white"
        }}>
                I&apos;m already a user.{" "}
        </Text>
        <Link _text={{
          color: "indigo.500",
          fontWeight: "medium",
          fontSize: "sm"
        }} 
        onPress={()=>setNewUser(false)}
        >
                Sign In
        </Link>
      </HStack>
    </Box>
  </Center>;
};
export default RegiserUser