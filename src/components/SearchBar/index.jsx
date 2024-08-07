import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Box } from '@mui/material';
// hooks
// import UseDebounce from '../../hooks/useDebounce';
// redux hooks
import { useArticles } from '../../redux/hooks/useArticles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

const SearchBar = ({ id = 'SearchBar' }) => {
  const { addFilter, filter } = useArticles();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSearchTerm(filter.q || '');
  }, [filter.q]);

  // const newSearchTerm = UseDebounce(searchTerm, 1500);

  // useEffect(() => {
  //   if (newSearchTerm) {
  //     setFilter({ q: newSearchTerm });
  //   } else {
  //     setFilter(null);
  //   }
  // }, [newSearchTerm, setFilter]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      addFilter({ q: searchTerm });
    }
  };

  const handleBlur = event => {
    addFilter({ q: event.target.value });
  };

  return (
    <Box id={id}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          value={searchTerm}
        />
      </Search>
    </Box>
  );
};

SearchBar.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SearchBar;
