import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import Search from './components/Search'
import FimlDetail from './components/FilmDetail'

const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Search} options={{ title: ' Rechercher' }} />
        <Stack.Screen name="FilmDetail" component={FimlDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


