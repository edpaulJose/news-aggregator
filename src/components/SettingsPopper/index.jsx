import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  ClickAwayListener,
  Grow,
  MenuItem,
  Paper,
  Popper,
  Select,
} from '@mui/material';

// utils
import { COUNTRY_CODES } from '../../utils/staticConstants';

// redux hooks
import { useApp } from '../../redux/hooks';

import './index.css';

const SettingsPopper = ({ id, open = false, onClose, anchorEl }) => {
  const { country, setCountry } = useApp();

  const handleClose = event => {
    if (onClose) {
      onClose(event);
    }
  };

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
                <Box className="settings-container">
                  <Box sx={{ minWidth: '100px' }}>
                    <Select
                      id='settingsPopper-Select'
                      value={country}
                      label=""
                      size='small'
                      onChange={(event) => setCountry(event.target.value)}
                    >
                      {COUNTRY_CODES.map(code => (
                        <MenuItem key={code} value={code}>
                          {code.toUpperCase()}
                        </MenuItem>
                      ))}
                    </Select>
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

SettingsPopper.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool,
  anchorEl: PropTypes.oneOfType([
    PropTypes.instanceOf(Element),
    PropTypes.oneOf([null]),
  ]),
  onClose: PropTypes.func,
};

export default SettingsPopper;
