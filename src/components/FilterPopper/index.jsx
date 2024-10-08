import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  Typography,
  Divider,
  Button,
  TextField,
} from '@mui/material';

// utils
import {
  DEFAULT_FILTERS,
  DEFAULT_PAGINATION,
} from '../../utils/staticConstants';
import {
  isEmptyOrNilArray,
  isEqualIgnoreCase,
} from '../../utils/staticFunctions';

// Custom components
import LoadOnOpenAutocomplete from '../LoadOnOpenAutcomplete';
import DateFilter from '../DateFilter';

// redux
import { useArticles } from '../../redux/hooks';

import './index.css';

const FilterPopper = ({ id, open = false, onClose, anchorEl }) => {
  const { loadAllSources, sources, filter, setFilter, setCurrentPage } =
    useArticles();
  const { pathname } = useLocation();
  const [newFilter, setNewFilter] = useState();

  const showSourceOptions = useMemo(
    () =>
      isEqualIgnoreCase(pathname, '/') || isEqualIgnoreCase(pathname, '/home'),
    [pathname]
  );

  const isValidFilter = useMemo(
    () => newFilter?.q || !isEmptyOrNilArray(newFilter?.sources),
    [newFilter]
  );

  useEffect(() => {
    setNewFilter(filter);
  }, [filter]);

  const handleClose = event => {
    if (onClose) {
      onClose(event);
    }
  };

  const handleLoadOptions = () => {
    if (open) {
      loadAllSources();
    }
  };

  const handleSearchKeyChange = useCallback(event => {
    setNewFilter(prevState => ({ ...prevState, q: event.target.value }));
  }, []);

  const handleChange = useCallback(value => {
    setNewFilter(prevState => ({
      ...prevState,
      ...value,
    }));
  }, []);

  const handleChangeFilter = useCallback(
    event => {
      setFilter(newFilter);
      setCurrentPage(DEFAULT_PAGINATION.currentPage);
      if (onClose) {
        onClose(event);
      }
    },
    [newFilter, onClose, setCurrentPage, setFilter]
  );

  const handleClear = useCallback(() => {
    setFilter(DEFAULT_FILTERS);
  }, [setFilter]);

  return (
    <Box id={id}>
      <Popper
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 1300 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Box className="filter-container">
                  <Box>
                    <Typography variant="body1">
                      Narrow your search results
                    </Typography>
                  </Box>
                  <Divider />
                  <Box className="filter-item">
                    <TextField
                      id="FilterPopper-SearchKey-TextField"
                      value={newFilter?.q || ''}
                      label="Search Key"
                      onChange={handleSearchKeyChange}
                      size="small"
                      fullWidth
                      variant="standard"
                    />
                  </Box>
                  {showSourceOptions && (
                    <Box className="filter-item">
                      <LoadOnOpenAutocomplete
                        id="FilterPopper-LoadOnOpenAutocomplete"
                        options={sources}
                        loadOptions={handleLoadOptions}
                        multiple
                        onChange={handleChange}
                        label="Sources"
                        value={newFilter?.sources || []}
                        fieldResponse="sources"
                      />
                    </Box>
                  )}
                  <Box className="filter-item">
                    <DateFilter
                      id="FilterPopper-DateFilter"
                      fieldResponse="date"
                      value={newFilter?.date}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box className="filter-item filter-actions">
                    <Button size="small" onClick={handleClear}>
                      Clear
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={handleChangeFilter}
                      disabled={!isValidFilter}
                    >
                      Search
                    </Button>
                  </Box>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

FilterPopper.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool,
  anchorEl: PropTypes.oneOfType([
    PropTypes.instanceOf(Element),
    PropTypes.oneOf([null]),
  ]),
  onClose: PropTypes.func,
};

export default FilterPopper;
