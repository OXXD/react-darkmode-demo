import clsx from 'clsx';
import './index.less';

type PageContainerProps = {
  children: React.ReactNode;
  hasTabBar?: boolean;
  isFullPage?: boolean;
  style?: React.CSSProperties;
};

function PageContainer(props: PageContainerProps) {
  const { children, hasTabBar, isFullPage, style } = props;

  const className = clsx('page', {
    'is-padding-tabbar': hasTabBar,
    'is-full-page': isFullPage,
  });

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

export default PageContainer;
