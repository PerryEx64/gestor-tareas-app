import { Toggle } from '@ui-kitten/components';
import { useTheme } from '../hooks/useTheme';

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();
  const checked = theme === 'dark';

  return (
    <Toggle
      checked={checked}
      onChange={toggleTheme}
      style={{ transform: [{ scale: 0.9 }] }}
    >
      {checked ? 'Modo Oscuro' : 'Modo Claro'}
    </Toggle>
  );
};
