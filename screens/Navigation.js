import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator } from 'react-native-web';
import { View } from 'native-base';
import {  Auth } from 'aws-amplify';
import {Journal} from "./Journal";
import CreateNote from "../components/CreateNote";
import ConfirmationEmail from "../components/AuthComponents/ConfirmationEmail";
import Login from './Login';
import ForgotPassword from "../components/AuthComponents/ForgotPassword";
import ResetPassword from "../components/AuthComponents/ResetPassword";
import useAppContext from '../store/userContext';
import { Home } from './Home';
import { Profile } from './Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Octicons'

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
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>

      {currentuser ?  (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle:{
              position: 'absolute',
              bottom: 25,
              left: 20,
              right:20,
              elevation: 0,
              backgroundColor: "#fff",
              borderRadius: 20,
              height: 60
            }
          }}
          
        >
          <Tab.Screen
            options={{
              tabBarIcon: ({focused})=>(
                <Icon name='home' size={25} color={focused ? "#000" : "#c2c2c2" }/>
              )
            }}
            name="Home" component={Home} />
          <Tab.Screen name="CreateNote" 
            options={{
              tabBarIcon: ({focused})=>(
                <Icon name='plus-circle' size={25} color={focused ? "#000" : "#c2c2c2" }/>
              )
            }}
            component={CreateNote} />
          <Tab.Screen
          
            options={{
              tabBarIcon: ({focused})=>(
                <Icon name='book' size={25} color={focused ? "#000" : "#c2c2c2" }/>
              )
            }}
            name="Journal" component={Journal} />
          <Tab.Screen
            options={{
              tabBarIcon: ({focused})=>(
                <Icon name='gear' size={25} color={focused ? "#000" : "#c2c2c2" }/>
              )
            }}
            name="Profile" component={Profile} />
          
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
            <Stack.Screen name='Home' component={Home} />
          </Stack.Navigator>
        )}
    
      
    </NavigationContainer>
  )
}

export default Navigation