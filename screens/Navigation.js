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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Navigation = () => {
  const [currentuser, setCurrentuser] = React.useState(true);
  const { setUser  } = useAppContext();
  const checkuser = async () => {
    try{
      const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
      setCurrentuser(user);
      setUser(user);
    } catch(err) {
      console.log(err)
      setCurrentuser(null);
      setUser(null);
    }
  }

  React.useEffect(() => {
    checkuser();
  }, [])



  const Stack = createNativeStackNavigator();
  const Tab = createMaterialTopTabNavigator();
  return (
    <NavigationContainer>

      {currentuser ?  (
        <Tab.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Tab.Screen name="CreateNote" component={CreateNote} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Journal" component={Journal} />
          
        </Tab.Navigator>
      )
        : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ConfirmationEmail" component={ConfirmationEmail} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </Stack.Navigator>
        )}
    
      
    </NavigationContainer>
  )
}

export default Navigation