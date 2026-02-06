import { useNavigation } from '@react-navigation/native';
import { PublicStackProps } from '../navigation/root-navigation';

export const usePublicNavigation = () => useNavigation<PublicStackProps>();
