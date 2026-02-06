import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AssetIconsPack } from '../components/icons/IconProvider';
import { ThemeContextProvider } from '../store/ThemeContextProvider';
import { RegisterScreen } from '../screens/public/auth/RegisterScreen';

describe('<LoginScreen />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText, getByTestId } = render(
      <ThemeContextProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
            <RegisterScreen />
          </NavigationContainer>
        </ApplicationProvider>
      </ThemeContextProvider>
    );

    getByText('Crear Cuenta');
    const registerButton = getByTestId('register-button');
    expect(registerButton).toBeDefined();
  });
});
