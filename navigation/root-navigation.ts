import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const PublicStack =
  createNativeStackNavigator<PublicRootStackParamList>();
export const PrivateStack =
  createBottomTabNavigator<PrivateRootStackParamList>();

export type PublicStackProps =
  NativeStackNavigationProp<PublicRootStackParamList>;
export type PrivateStackProps =
  NativeStackNavigationProp<PublicRootStackParamList>;

export type PublicRootStackParamList = {
  login: undefined;
  register: undefined;
};

export type PrivateRootStackParamList = {
  tasks: undefined;
  profile: undefined;
};
