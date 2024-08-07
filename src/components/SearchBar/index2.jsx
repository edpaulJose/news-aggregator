import React from 'react';
import { TextField, Select, MenuItem, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const SearchAndFilter = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log("Data....", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="keyword"
            control={control}
            render={({ field }) => <TextField {...field} label="Keyword" fullWidth />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select {...field} fullWidth>
                <MenuItem value="technology">Technology</MenuItem>
                <MenuItem value="science">Science</MenuItem>
                <MenuItem value="business">Business</MenuItem>
              </Select>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Controller
            name="source"
            control={control}
            render={({ field }) => (
              <Select {...field} fullWidth>
                <MenuItem value="source1">Source 1</MenuItem>
                <MenuItem value="source2">Source 2</MenuItem>
              </Select>
            )}
          />
        </Grid>
      </Grid>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchAndFilter;