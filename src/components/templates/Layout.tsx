import React, { PropsWithChildren } from 'react';

interface Props {}

export const Layout = (props: PropsWithChildren<Props>) => {
  const { children } = props;
  return (
    <div className="layout">
      {children}
    </div>
  );
};
