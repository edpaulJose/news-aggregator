import { useEffect, useState } from 'react';
import Header from '../Header';
import Preloader from '../PreLoader';
import WithRoot from '../../hoc/withroot';
import { Box } from '@mui/material';

// redux hooks
import { useApp } from '../../redux/hooks';

import './index.css';

const Layout = ({ children }) => {
  const { isLoading } = useApp();
  const [headerHeight, setHeaderHeight] = useState(70);

  useEffect(() => {
    const headerElement = document.querySelector('#main-header');
    if (headerElement) {
      setHeaderHeight(headerElement.offsetHeight);
    }
  }, []);

  return (
    <div>
      <Header id="main-header" />
      <main
        style={{
          height: `calc(100vh - ${headerHeight}px)`,
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative',
        }}
      >
        <Preloader isLoading={isLoading} />
        <Box sx={{ margin: { xs: '0px 5%', sm: '0px 10%', md: '0px 15%' } }}>
          {children}
        </Box>
        {/* <Footer id='layout-footer' /> */}
      </main>
    </div>
  );
};

export default WithRoot(Layout);
