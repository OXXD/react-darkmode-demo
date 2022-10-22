import clsx from 'clsx';
import React, { forwardRef } from 'react';
import './index.less';

interface PageContainerContentProps {
  children: React.ReactNode;
  background?: boolean;
  isFlex?: boolean;
  style?: React.CSSProperties;
}

function PageContainerContent(
  props: PageContainerContentProps,
  ref?: React.Ref<HTMLDivElement>
) {
  const { children, background, isFlex, style } = props;

  const classNames = clsx('page-content', {
    'is-background': background,
    'is-flex': isFlex,
  });

  return (
    <div ref={ref} className={classNames} style={style}>
      {children}
    </div>
  );
}

export default forwardRef(PageContainerContent);
