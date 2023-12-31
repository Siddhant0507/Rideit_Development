import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../src/screens/HomeScreen'
import RideSelect from '../../src/screens/RideSelect';
import DateTimePicker from '../../src/screens/DateTimePicker';
import DropDateTime from '../screens/DropDateTime';
import BookingDetail from '../screens/BookingDetail';
import BookingComplete from '../screens/BookingComplete';
const HomeStack = () => {
    const Stack = createStackNavigator();
  return (
   <NavigationContainer independent={true}>
    <Stack.Navigator>
    <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RideSelect"
          component={RideSelect}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="DateTimePicker"
          component={DateTimePicker}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="DropDateTime"
          component={DropDateTime}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="BookingDetail"
          component={BookingDetail}
          options={{headerShown: false}}
        /> 
           <Stack.Screen
          name="BookingComplete"
          component={BookingComplete}
          options={{headerShown: false}}
        /> 
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default HomeStack

const styles = StyleSheet.create({})