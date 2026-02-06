import { PrivateStack } from './root-navigation';
import { ProfileScreen } from '../screens/private/profile/ProfileScreen';
import { TasksScreen } from '../screens/private/tasks/TasksScreen';
import { Image } from 'react-native';
import { useTheme } from '../hooks/useTheme';

export const PrivateScreens = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <PrivateStack.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? '#222B45' : '#FFFFFF',
          borderTopColor: isDark ? '#101426' : '#FFFFFF',
        },
        tabBarActiveTintColor: isDark ? '#FFFFFF' : '#222b45',
        tabBarInactiveTintColor: isDark ? '#E4E9F2' : '#222b45',
      }}
    >
      <PrivateStack.Screen
        name="tasks"
        options={{
          headerShown: false,
          title: 'Tareas',
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require('../assets/tasks_icon.png')}
              style={{ width: size + 5, height: size + 5 }}
            />
          ),
        }}
        component={TasksScreen}
      />
      <PrivateStack.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Perfil',
          tabBarIcon: ({ size, color }) => (
            <Image
              source={require('../assets/config_icon.png')}
              style={{ width: size + 5, height: size + 5 }}
            />
          ),
        }}
        component={ProfileScreen}
      />
    </PrivateStack.Navigator>
  );
};
