import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLoading as setLoadingAction,
  setCountry as setCountryAction,
} from '../actions/appActions';
import { selectIsloading, selectCountry } from '../store';

const DEFAULT_COUNTRY = import.meta.env.VITE_DEFAULT_COUNTRY;

export const useApp = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsloading);
  const country = useSelector(selectCountry);

  const setLoading = useCallback(
    (value = false) => {
      dispatch(setLoadingAction(value));
    },
    [dispatch]
  );

  const setCountry = useCallback(
    (country = DEFAULT_COUNTRY) => {
      dispatch(setCountryAction(country));
    },
    [dispatch]
  );

  return {
    isLoading,
    setLoading,
    country,
    setCountry,
  };
};
