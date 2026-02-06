import { useUserData } from '../hooks/useUser';
import { PublicScreens } from './PublicScreens';
import { PrivateScreens } from './PrivateScreens';

export const AppNavigation = () => {
  const userData = useUserData();

  if (userData) {
    return <PrivateScreens />;
  }

  return <PublicScreens />;
};
