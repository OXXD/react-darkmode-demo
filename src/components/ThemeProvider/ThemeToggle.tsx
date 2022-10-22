import { Button } from 'react-vant';
import { Theme, themes, useTheme } from './index';

function ThemeToggle() {
  const { theme, setTheme, setIsPreferSystemTheme } = useTheme();

  return (
    <Button.Group round block type="primary">
      {themes.map((button, index) => (
        <Button
          key={button}
          plain={button !== theme}
          onClick={() => {
            setIsPreferSystemTheme(false);
            setTheme((previousTheme: Theme) =>
              previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
            );
          }}
        >
          {button}
        </Button>
      ))}
    </Button.Group>
  );
}

export default ThemeToggle;
