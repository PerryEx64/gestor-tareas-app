import { useNavigation } from '@react-navigation/native';
import { PrivateStackProps } from '../navigation/root-navigation';

export const usePrivateNavigation = () => useNavigation<PrivateStackProps>();
