import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native-web';
import { View } from 'native-base';
import {  Auth } from 'aws-amplify';
import Home from "./Home";
import Journal from "./Journal";
import CreateNote from "../components/createNote";
import ConfirmationEmail from "../components/ConfirmationEmail";
import Login from './Login';
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import useAppContext from '../store/userContext';

const Navigation = () => {
  const [currentuser, setCurrentuser] = React.useState(null);
  const { setUser  } = useAppContext();
  const checkuser = async () => {
    const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
    setCurrentuser(user);
    setUser(user);
  }

  React.useEffect(() => {
    checkuser();
  }, [])

  if(currentuser === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator/>
      </View>
    )
  }

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {currentuser ?  (
          <>

            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Journal" component={Journal} />
            <Stack.Screen name="CreateNote" component={CreateNote} />
          
          </>
        )
          : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="ConfirmationEmail" component={ConfirmationEmail} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </>
          )}
    
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation