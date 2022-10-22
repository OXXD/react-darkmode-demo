import { Cell, NavBar, Switch } from 'react-vant';
import PageContainer from '@/components/PageContainer';
import { Theme, useTheme } from '@/components/ThemeProvider';

function PageHome() {
  const { theme, setTheme, setIsPreferSystemTheme } = useTheme();

  const handleChangeTheme = () => {
    setIsPreferSystemTheme(false);
    setTheme((previousTheme: Theme) =>
      previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    );
  };

  return (
    <PageContainer>
      <NavBar
        title="Navbar"
        fixed
        placeholder
        leftArrow={false}
        border={false}
      />
      <div>PageHome</div>
      <Cell.Group className="m-t-16" card>
        <Cell
          title="深色模式"
          rightIcon={
            <Switch
              size={24}
              activeColor="var(--app-switch-active-color)"
              inactiveColor="var(--app-switch-inactive-color)"
              checked={theme === Theme.DARK}
              onChange={handleChangeTheme}
            />
          }
        />
      </Cell.Group>
    </PageContainer>
  );
}

export default PageHome;
