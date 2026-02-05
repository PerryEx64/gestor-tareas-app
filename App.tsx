import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider } from './store/AuthContextProvider';
import { AppNavigation } from './navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <SafeAreaProvider>
              <AuthContextProvider>
                <IconRegistry icons={EvaIconsPack} />
                <StatusBar style="auto" />
                <AppNavigation />
                <Toast />
              </AuthContextProvider>
            </SafeAreaProvider>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </ApplicationProvider>
    </GestureHandlerRootView>
  );
}
