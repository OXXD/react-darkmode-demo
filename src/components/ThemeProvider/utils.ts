enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}
const themes: Array<Theme> = Object.values(Theme);

const prefersDarkMQ = '(prefers-color-scheme: dark)';

const getPreferredTheme = () =>
  window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT;

const updateHtmlTag = (str: string) => {
  const html = document.querySelector('html');
  html?.setAttribute('data-theme', str);
};

export { Theme, themes, updateHtmlTag, getPreferredTheme, prefersDarkMQ };
