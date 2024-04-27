import { StyleSheet, Appearance  } from 'react-native';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImagePage from './components/ImagePage';
import Firebasedata from './components/Firebasedata';


const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Define your light theme colors here
  },
};

const DarkAppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    // Define your dark theme colors here
  },
};


export type RootStackParamList={
  Firebasedata : undefined,
  ImageData: {id:3}
}

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = Appearance.getColorScheme();

  return(
    
    <NavigationContainer theme={colorScheme === 'dark' ? DarkAppTheme : AppTheme}>
    <Stack.Navigator>
      <Stack.Screen name="Home" component = {Firebasedata} />
      <Stack.Screen name="ImagePage" component = {ImagePage} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({
    data: {
      fontSize: 40,
      color: 'green'
    }
})
