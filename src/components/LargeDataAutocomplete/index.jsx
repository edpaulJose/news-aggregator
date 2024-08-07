import React, { useState, useEffect, useCallback } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useDebounce } from '../../hooks';

// redux
import { useArticles } from '../../redux/hooks/useArticles'

const LargeAutocomplete = ({ fetchOptions }) => {
  const { loadAllSources } = useArticles();
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const debounce = useDebounce(inputValue);

  useEffect(() => {
    // Load the initial 10 options
    const loadInitialOptions = async () => {
      setLoading(true);
      const initialOptions = await fetchOptions('');
      setOptions(initialOptions.slice(0, 10));
      setLoading(false);
    };

    loadInitialOptions();
  }, [fetchOptions]);

  const handleInputChange = useCallback(
    (event, newInputValue) => {
      setInputValue(newInputValue);
    },
    // debounce(async (event, newInputValue) => {
    //   if (newInputValue) {
    //     setLoading(true);
    //     const newOptions = await fetchOptions(newInputValue);
    //     setOptions(newOptions);
    //     setLoading(false);
    //   }
    // }, 300),
    [fetchOptions]
  );

  return (
    <Autocomplete
      options={options}
      loading={loading}
      onInputChange={handleInputChange}
      renderInput={params => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default LargeAutocomplete;
