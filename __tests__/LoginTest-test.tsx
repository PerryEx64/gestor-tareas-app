import { render } from '@testing-library/react-native';
import { LoginScreen } from '../screens/public/auth/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AssetIconsPack } from '../components/icons/IconProvider';
import { ThemeContextProvider } from '../store/ThemeContextProvider';

describe('<LoginScreen />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText, getByTestId } = render(
      <ThemeContextProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
            <LoginScreen />
          </NavigationContainer>
        </ApplicationProvider>
      </ThemeContextProvider>
    );

    getByText('Regístrate aquí');
    getByText('¿Olvidaste tu contraseña?');
    const loginButton = getByTestId('login-button');
    expect(loginButton).toBeDefined();
  });
});
