import { Fragment, useState } from 'react';
import { Cell, NavBar, Radio, Switch } from 'react-vant';
import { Success } from '@react-vant/icons';
import PageContainer from '@/components/PageContainer';
import PageContainerContent from '@/components/PageContainer/PageContainerContent';
import {
  getPreferredTheme,
  Theme,
  updateHtmlTag,
  useTheme,
} from '@/components/ThemeProvider';
import './index.less';

function PageUserSettingsTheme() {
  const { theme, setTheme, isPreferSystemTheme, setIsPreferSystemTheme } =
    useTheme();
  const [useSystemTheme, setUseSystemTheme] = useState<boolean | undefined>(
    isPreferSystemTheme
  );
  const [manualTheme, setManualTheme] = useState<Theme>(theme);

  const handleClickLeft = () => {
    // reset html tag
    updateHtmlTag(theme);
    // TODO: 接入 react-router 后退返回
    // navigate(-1);
  };

  const handleClickSubmit = () => {
    // save
    setIsPreferSystemTheme(useSystemTheme);
    setTheme(manualTheme);
    // TODO: 接入 react-router 返回页面
    // navigate('/user');
  };

  const handleChangeUseSystemTheme = (checked: boolean) => {
    setUseSystemTheme(checked);
    const preferredTheme = getPreferredTheme();
    if (checked) {
      // 如果打开跟随系统，设置当前主题为系统主题
      updateHtmlTag(preferredTheme);
    } else {
      // 如果关闭跟随系统，设置手动选择为系统主题
      setManualTheme(preferredTheme);
    }
  };

  const handleChangeManualTheme = (theme: Theme) => {
    setManualTheme(theme);
    updateHtmlTag(theme);
  };

  return (
    <PageContainer>
      <NavBar
        title="深色模式"
        fixed
        placeholder
        border={false}
        onClickLeft={handleClickLeft}
        rightText="保存"
        onClickRight={handleClickSubmit}
      />
      <PageContainerContent style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Cell
          title="跟随系统"
          label="开启后，将跟随系统打开或关闭深色模式"
          center
          rightIcon={
            <Switch
              size={24}
              activeColor="var(--app-switch-active-color)"
              inactiveColor="var(--app-switch-inactive-color)"
              checked={useSystemTheme}
              onChange={handleChangeUseSystemTheme}
            />
          }
        />
        {!useSystemTheme ? (
          <Fragment>
            <div className="user-theme-title">手动选择</div>
            <Radio.Group value={manualTheme}>
              <Cell.Group border={false}>
                <Cell
                  title="普通模式"
                  onClick={() => handleChangeManualTheme(Theme.LIGHT)}
                  rightIcon={
                    <Radio
                      name={Theme.LIGHT}
                      iconRender={() =>
                        manualTheme === Theme.LIGHT ? <Success /> : null
                      }
                    />
                  }
                />
                <Cell
                  title="深色模式"
                  onClick={() => handleChangeManualTheme(Theme.DARK)}
                  rightIcon={
                    <Radio
                      name={Theme.DARK}
                      checkedColor="var(--app-switch-active-color)"
                      iconRender={() =>
                        manualTheme === Theme.DARK ? <Success /> : null
                      }
                    />
                  }
                />
              </Cell.Group>
            </Radio.Group>
          </Fragment>
        ) : null}
      </PageContainerContent>
    </PageContainer>
  );
}

export default PageUserSettingsTheme;
