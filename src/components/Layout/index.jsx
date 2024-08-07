import React, { useMemo } from 'react';
import Header from '../Header';
import Preloader from '../PreLoader';
import WithRoot from '../../hoc/withroot';
import { useApp } from '../../redux/hooks/useApp';
import { Box } from '@mui/material';
// import Footer from "../../components/Footer";

import './index.css';

const Layout = ({ children }) => {
  const { isLoading } = useApp();
  const rootHeaderHeight = useMemo(
    () => document.querySelector('#root main-header')?.offsetHeight || 70,
    []
  );

  return (
    <div>
      <Header id="main-header" />
      <main
        style={{
          height: `calc(100vh - ${rootHeaderHeight}px)`,
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
        }}
        // onScroll={handleScroll}
      >
        <Preloader isLoading={isLoading} />
        <Box className="layout-children">{children}</Box>
        {/* <Footer id='layout-footer' /> */}
      </main>
    </div>
  );
};

export default WithRoot(Layout);
