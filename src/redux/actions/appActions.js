import { setLoading as setLoadingSlice } from '../slices/appSlice';

export const setLoading = isLoading => async dispatch => {
  dispatch(setLoadingSlice(isLoading));
};
