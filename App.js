import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, OrderDelivery, Restaurant} from './screens';
const Stack = createStackNavigator();
import Tabs from './navigation/tabs';
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="home">
        <Stack.Screen name="home" component={Tabs} />
        <Stack.Screen name="delivery" component={OrderDelivery} />
        <Stack.Screen name="restaurant" component={Restaurant} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
