import {
  setLoading as setLoadingSlice,
  setCountry as setCountrySlice,
} from '../slices/appSlice';

export const setLoading = isLoading => async dispatch => {
  dispatch(setLoadingSlice(isLoading));
};

export const setCountry = country => async dispatch => {
  dispatch(setCountrySlice(country));
};
