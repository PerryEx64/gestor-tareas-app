import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider } from './store/AuthContextProvider';
import { AppNavigation } from './navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AuthContextProvider>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <StatusBar style="auto" />
            <AppNavigation />
            <Toast />
          </ApplicationProvider>
        </AuthContextProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
