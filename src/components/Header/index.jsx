import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';

// Custom components
import SearchBar from '../SearchBar';
import FilterPopper from '../FilterPopper';

import './index.css';

const Header = ({ id, title = 'News' }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const filterAnchorRef = useRef(null);

  const handleMoreIcon = () => {
    setOpenFilter(prevState => !prevState);
  };

  const handleFilterClose = event => {
    if (
      filterAnchorRef.current &&
      filterAnchorRef.current.contains(event.target)
    ) {
      return;
    }

    setOpenFilter(false);
  };

  return (
    <Box id={id}>
      <AppBar position="sticky">
        <Toolbar>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Box className="upper-header">
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5">{title}</Typography>
              </Box>
              <Box>
                <SearchBar id="Header-SearchBar" />
              </Box>
              <Box>
                <IconButton ref={filterAnchorRef} onClick={handleMoreIcon}>
                  <MoreIcon />
                </IconButton>
              </Box>
              <Box>
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Box>
            </Box>
            <Box className="lower-header">
              
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <FilterPopper
        id="Header-FilterPopper"
        open={openFilter}
        // ref={filterAnchorRef}
        onClose={handleFilterClose}
        anchorEl={filterAnchorRef.current}
      />
    </Box>
  );
};

Header.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default Header;
