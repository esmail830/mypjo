import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import WorkersScreen from '../screens/WorkersScreen';
import SudanProductsScreen from '../screens/SudanProductsScreen';
import GeneralProductsScreen from '../screens/GeneralProductsScreen';
import ApartmentsScreen from '../screens/ApartmentsScreen';
import EventsScreen from '../screens/EventsScreen';
import UNHCRScreen from '../screens/UNHCRScreen';
import DoctorsScreen from '../screens/DoctorsScreen';
import DoctorsScreen from '../screens/DoctorsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'تسجيل الدخول' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'إنشاء حساب' }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'الرئيسية' }} />
      <Stack.Screen name="Workers" component={WorkersScreen} options={{ title: 'طلب عمال' }} />
      <Stack.Screen name="Doctors" component={DoctorsScreen} options={{ title: 'حجز عند الأطباء' }} />
    </Stack.Navigator>
  );
}
