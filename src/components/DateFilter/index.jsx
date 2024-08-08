import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, Box, TextField } from '@mui/material';

// import { DATE_OPTIONS } from '../../utils/staticConstants';
import { generateOptions } from '../../utils/dateFunctions';

import './index.css';

const DateFilter = ({ id, label = 'Date', value, onChange, fieldResponse }) => {
  const dateOptions = useMemo(() => generateOptions(new Date()), []);

  const valueObj = useMemo(() => {
    if (!value) {
      return dateOptions[0];
    }
    return value;
  }, [value, dateOptions]);

  const handleChange = (event, value) => {
    if (onChange) {
      onChange({ [fieldResponse]: value });
    }
  };

  return (
    <Box id={id} className="date-filter-container">
      <Autocomplete
        value={valueObj}
        clearIcon={false}
        freeSolo={false}
        inputValue={valueObj.name}
        getOptionLabel={option => option.label}
        isOptionEqualToValue={option => option.code === valueObj.code}
        disablePortal
        id="dateFilter-autocomplete"
        options={dateOptions}
        size="small"
        renderInput={params => (
          <TextField
            {...params}
            label={label}
            inputProps={{
              ...params.inputProps,
              readOnly: true,
            }}
          />
        )}
        onChange={handleChange}
      />
    </Box>
  );
};

DateFilter.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.shape({
    code: PropTypes.string.isRequired,
    label: PropTypes.string,
    to: PropTypes.string,
    from: PropTypes.string,
  }),
  onChange: PropTypes.func,
  fieldResponse: PropTypes.string,
};

export default DateFilter;
