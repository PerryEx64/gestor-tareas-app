import { createContext, useContext } from 'react';

interface ThemeContextProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);
