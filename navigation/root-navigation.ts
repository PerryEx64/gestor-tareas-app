import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

export const PublicStack =
  createNativeStackNavigator<PublicRootStackParamList>();
export const PrivateStack =
  createNativeStackNavigator<PrivateRootStackParamList>();

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
