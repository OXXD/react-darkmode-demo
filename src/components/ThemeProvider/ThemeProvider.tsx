import {
  LOCAL_STORAGE_KEY_THEME,
  LOCAL_STORAGE_KEY_THEME_SYSTEM,
} from '@/constants/config';
import { noop } from '@/utils';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import {
  getPreferredTheme,
  prefersDarkMQ,
  Theme,
  themes,
  updateHtmlTag,
} from './utils';

type ThemeContextType = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  isPreferSystemTheme: boolean | undefined; // 主题是否跟随系统
  setIsPreferSystemTheme: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >; // 设置主题是否跟随系统
};

const ThemeContext = createContext<ThemeContextType>({
  theme: getPreferredTheme(),
  setTheme: noop,
  isPreferSystemTheme: true,
  setIsPreferSystemTheme: noop,
});
ThemeContext.displayName = 'ThemeContext';

const useTheme = () => {
  return useContext(ThemeContext);
};

function ThemeProvider({
  children,
  specifiedTheme,
}: {
  children: React.ReactNode;
  specifiedTheme?: Theme | null;
}) {
  /**
   * 主题是否跟随系统，默认 true
   */
  const [isPreferSystemTheme, setIsPreferSystemTheme] = useLocalStorage(
    LOCAL_STORAGE_KEY_THEME_SYSTEM,
    true
  );
  const [theme, setTheme] = useState<Theme>(() => {
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) return specifiedTheme;
    }

    if (isPreferSystemTheme) {
      return getPreferredTheme();
    }

    const localTheme = window.localStorage.getItem(
      LOCAL_STORAGE_KEY_THEME
    ) as Theme | null;
    if (localTheme) {
      return localTheme;
    }

    return getPreferredTheme();
  });

  useEffect(() => {
    if (!theme) {
      return;
    }
    window.localStorage.setItem(LOCAL_STORAGE_KEY_THEME, theme);
    updateHtmlTag(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersDarkMQ);
    const handleChange = () => {
      // 如果主题跟随系统，监听系统变化
      if (isPreferSystemTheme) {
        const preferredTheme = mediaQuery.matches ? Theme.DARK : Theme.LIGHT;
        setTheme(preferredTheme);
        updateHtmlTag(preferredTheme);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isPreferSystemTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, isPreferSystemTheme, setIsPreferSystemTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { useTheme, ThemeProvider };
