import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import createTheme from '../config/theme';

const withRoot = Component => {
  const WithRoot = props => {
    return (
      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    );
  };

  return WithRoot;
};

export default withRoot;
