import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider } from './store/AuthContextProvider';
import { AppNavigation } from './navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthContextProvider>
          <AppNavigation />
          <StatusBar style="auto" />
        </AuthContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
