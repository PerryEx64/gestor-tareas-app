import { PrivateStack } from './root-navigation';
import { ProfileScreen } from '../screens/private/profile/ProfileScreen';
import { TasksScreen } from '../screens/private/tasks/TasksScreen';

export const PrivateScreens = () => {
  return (
    <PrivateStack.Navigator>
      <PrivateStack.Screen name="tasks" component={TasksScreen} />
      <PrivateStack.Screen name="profile" component={ProfileScreen} />
    </PrivateStack.Navigator>
  );
};
