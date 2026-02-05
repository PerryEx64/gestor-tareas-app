import { LayoutScreen } from '../../../components/layouts/LayoutScreen';
import { LoginForm } from '../../../components/forms/LoginForm';

export const LoginScreen = () => {
  return (
    <LayoutScreen level="1">
      <LoginForm onSubmit={() => {}} />
    </LayoutScreen>
  );
};
