import { extendTheme, NativeBaseProvider,  } from "native-base";
import React from 'react';
import { Amplify, API } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import Navigation from "./screens/Navigation";
import { UserProvider } from "./store/userContext";
import { useFonts } from 'expo-font';
Amplify.configure({  ...awsconfig,  Analytics: {disabled: true,}, API: { endpoints: [ { 
  name: "journeyapp", 
  endpoint: "https://66wbbuf0j5.execute-api.ap-south-1.amazonaws.com/dev/", 
  region: "ap-south-1",
  path: '/user/{userId}',
} ] } })

API.configure(awsconfig);

// 291440
function App() {

  const [loaded] = useFonts({
    'CormorantGaramond-Bold': require('./assets/fonts/CormorantGaramond-Bold.ttf'),
    'CormorantGaramond-Medium': require('./assets/fonts/CormorantGaramond-Medium.ttf'),
    'CormorantGaramond-Regular': require('./assets/fonts/CormorantGaramond-Regular.ttf'),
    'CormorantGaramond-SemiBold': require('./assets/fonts/CormorantGaramond-SemiBold.ttf'),
  });

  const theme = extendTheme({
    colors: {
      primaryPurple: {
        100: "#27143D",
        200: "#35234B",
        300: "#383257",
        400:  "#424E72",
        500:  "#224166",
        600: "#1C2E52"
      }
    }, 
    fontConfig: {
      CormorantGaramond: {
        100: {
          normal: 'CormorantGaramond-Regular',
        },
        200: {
          normal: 'CormorantGaramond-Medium',
        },
        400: {
          normal: 'CormorantGaramond-SemiBold',
        },
        600: {
          normal: 'CormorantGaramond-Bold',
        },
      },
    },
    fonts: {
      heading: 'CormorantGaramond',
      body: 'CormorantGaramond',
      mono: 'CormorantGaramond',
    },
  });




  return (
    <NativeBaseProvider theme={theme} >
      <UserProvider>
        <Navigation/>
      </UserProvider>
    </NativeBaseProvider>
  );
}

export default (App)
