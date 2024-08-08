import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Select,
  MenuItem,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import MenuIcon from '@mui/icons-material/Menu';

// redux hooks
import { useApp, useArticles } from '../../redux/hooks';

// utils
import { CATEGORIES, getIndexByLink } from '../../utils/navigationItems';
import { isEqualIgnoreCase } from '../../utils/staticFunctions';
import {
  DEFAULT_FILTERS,
  DEFAULT_PAGINATION,
  COUNTRY_CODES,
} from '../../utils/staticConstants';

// Custom components
import SearchBar from '../SearchBar';
import FilterPopper from '../FilterPopper';

import './index.css';
import SettingsPopper from '../SettingsPopper';

const drawerWidth = 200;

const Header = ({ id, title = 'News' }) => {
  const { pathname } = useLocation();
  const { setFilter, setCurrentPage } = useArticles();
  const { country, setCountry } = useApp();
  const navigate = useNavigate();
  const filterAnchorRef = useRef(null);
  const settingsAnchorRef = useRef(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDrawerClosing, setIsDrawerClosing] = useState(false);

  useEffect(() => {
    setSelectedTab(getIndexByLink(pathname) || 0);
  }, [pathname]);

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

  const handleSettingsClose = event => {
    if (
      settingsAnchorRef.current &&
      settingsAnchorRef.current.contains(event.target)
    ) {
      return;
    }

    setOpenSettings(false);
  };

  const handleTabClick = (index, link) => {
    if (!isEqualIgnoreCase(link, pathname)) {
      // need to reset filter and currentpage for every tab change
      setFilter(DEFAULT_FILTERS);
      setCurrentPage(DEFAULT_PAGINATION.currentPage);

      setDrawerOpen(false);

      navigate(link);
      setSelectedTab(index);
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerClosing(true);
    setDrawerOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsDrawerClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isDrawerClosing) {
      setDrawerOpen(prevState => !prevState);
    }
  };

  const renderListItem = (category, i) => (
    <ListItem key={category.code} disablePadding>
      <ListItemButton onClick={() => handleTabClick(i, category.link)}>
        <Typography variant="h6">{category.label}</Typography>
      </ListItemButton>
    </ListItem>
  );

  const renderDrawer = () => (
    <Box>
      {renderListItem(CATEGORIES[0], 0)}
      <Divider />
      <List>
        {CATEGORIES.slice(1).map((category, i) =>
          renderListItem(category, i + 1)
        )}
      </List>
    </Box>
  );

  return (
    <Box id={id}>
      <AppBar position="sticky" sx={{ background: '#1b1b1b' }}>
        <Toolbar>
          <Box
            sx={{
              width: '100%',
            }}
          >
            <Box className="upper-header">
              <Box>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5">{title}</Typography>
              </Box>
              <Box>
                <SearchBar id="Header-SearchBar" />
              </Box>
              <Box>
                <IconButton
                  ref={filterAnchorRef}
                  onClick={handleMoreIcon}
                  sx={{ marginLeft: '8px' }}
                >
                  <TuneIcon sx={{ color: '#fff' }} />
                </IconButton>
              </Box>
              <Box>
                <Select
                  id="Header-Country-Select"
                  className="country-select"
                  value={country}
                  size="small"
                  onChange={event => setCountry(event.target.value)}
                >
                  {COUNTRY_CODES.map(code => (
                    <MenuItem key={code} value={code}>
                      {code.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
            <Box
              className="lower-header"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <Tabs
                value={selectedTab}
                variant="scrollable"
                textColor="inherit"
                aria-label="Category tabs"
                role="navigation"
              >
                {CATEGORIES.map((cat, i) => (
                  <Tab
                    key={cat.code}
                    label={cat.label}
                    onClick={() => handleTabClick(i, cat.link)}
                  />
                ))}
              </Tabs>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="categories"
      >
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {renderDrawer()}
        </Drawer>
      </Box>
      <FilterPopper
        id="Header-FilterPopper"
        open={openFilter}
        onClose={handleFilterClose}
        anchorEl={filterAnchorRef.current}
      />
      <SettingsPopper
        id="Header-SettingsPopper"
        open={openSettings}
        onClose={handleSettingsClose}
        anchorEl={settingsAnchorRef.current}
      />
    </Box>
  );
};

Header.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default Header;
