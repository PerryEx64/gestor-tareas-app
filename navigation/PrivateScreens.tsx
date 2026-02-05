import { PrivateStack } from './root-navigation';
import { ProfileScreen } from '../screens/private/profile/ProfileScreen';
import { TasksScreen } from '../screens/private/tasks/TasksScreen';

export const PrivateScreens = () => {
  return (
    <PrivateStack.Navigator>
      <PrivateStack.Screen
        name="tasks"
        options={{ headerShown: false }}
        component={TasksScreen}
      />
      <PrivateStack.Screen
        name="profile"
        options={{ headerShown: false }}
        component={ProfileScreen}
      />
    </PrivateStack.Navigator>
  );
};
