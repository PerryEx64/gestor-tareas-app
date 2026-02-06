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
import { ThemeContextProvider } from './store/ThemeContextProvider';
import { useTheme } from './hooks/useTheme';
import { AssetIconsPack } from './components/icons/IconProvider';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.setOptions({
  duration: 2000,
  fade: true,
});

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <ApplicationProvider
      {...eva}
      theme={theme === 'dark' ? eva.dark : eva.light}
    >
      <BottomSheetModalProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            <AuthContextProvider>
              <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
              <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
              <AppNavigation />
              <Toast />
            </AuthContextProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </ApplicationProvider>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeContextProvider>
        <AppContent />
      </ThemeContextProvider>
    </GestureHandlerRootView>
  );
}
