import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen.jsx';
import LogInScreen from './src/screens/LogInScreen.jsx';
import SignInScreen from './src/screens/SignInScreen.jsx';
import ReviewScreen from './src/screens/ReviewScreen.jsx';
import ReadScreen from './src/screens/ReadScreen.jsx';


const Stack = createNativeStackNavigator();


function App () {

  return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'
        screenOptions={{
          headerShown:true,
          statusBarColor: 'blue',
          headerStyle:{
            backgroundColor:'blue'
          }}}>

          <Stack.Screen
          name='Home' component={HomeScreen} 
          options={{header: ()=>null}}
          ></Stack.Screen>
          <Stack.Screen
          name='LogIn' component={LogInScreen}
          title
          ></Stack.Screen>
          <Stack.Screen
          name='SignIn' component={SignInScreen}
          title
          ></Stack.Screen>
          <Stack.Screen
          name='ReviewPage' component={ReviewScreen}
          title 
          ></Stack.Screen>
          <Stack.Screen
          name='ReadScreen' component={ReadScreen}
          options={{header: ()=>null}}
          title 
          ></Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    
  )
}

export default App;
