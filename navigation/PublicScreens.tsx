import { LoginScreen } from '../screens/public/auth/LoginScreen';
import { RegisterScreen } from '../screens/public/auth/RegisterScreen';
import { PublicStack } from './root-navigation';

export const PublicScreens = () => {
  return (
    <PublicStack.Navigator>
      <PublicStack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
        component={LoginScreen}
      />
      <PublicStack.Screen name="register" component={RegisterScreen} />
    </PublicStack.Navigator>
  );
};
