import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider } from './store/AuthContextProvider';
import { AppNavigation } from './navigation/AppNavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <AppNavigation />
        <StatusBar style="auto" />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}
