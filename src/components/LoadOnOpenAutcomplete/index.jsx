import React from 'react';
import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

const LoadOnOpenAutocomplete = ({
  id,
  options = [],
  loadOptions,
  onChange = () => {},
  multiple = false,
  label,
  value,
  fieldResponse,
}) => {
  const [open, setOpen] = useState(false);
  const loading = useMemo(() => open && options.length === 0, [open, options]);

  const valueObjects = useMemo(() => {
    return value
      .map(val => options.find(option => option.id === val))
      .filter(Boolean);
  }, [value, options]);

  const handleOpen = () => {
    if (loadOptions) {
      loadOptions();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, valueArr = []) => {
    const selectedOptions = valueArr.map(value => value.id);
    onChange({ [fieldResponse]: selectedOptions });
  };

  return (
    <Autocomplete
      id={id}
      sx={{ width: 300 }}
      open={open}
      value={valueObjects}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      onChange={handleChange}
      multiple={multiple}
      size="small"
      disableCloseOnSelect={multiple}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

LoadOnOpenAutocomplete.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onChange: PropTypes.func,
  loadOptions: PropTypes.func,
  multiple: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  fieldResponse: PropTypes.string,
};

export default LoadOnOpenAutocomplete;
