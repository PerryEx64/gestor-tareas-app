import { ReactNode, useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import {
  getStorageSecure,
  saveStorageSecure,
} from '../services/StorageService';
import Toast from 'react-native-toast-message';

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    getStorageSecure('theme').then((storedTheme) => {
      if (storedTheme === 'dark' || storedTheme === 'light') {
        setTheme(storedTheme);
      }
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    saveStorageSecure('theme', newTheme).catch(() => {
      Toast.show({
        type: 'error',
        text1: 'Error al guardar tema',
      });
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
