import { Fragment } from 'react';

import ResponsiveAppBar from './ResponsiveAppBar';

const Layout = (props) => {
  return (
    <Fragment>
      <ResponsiveAppBar />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
