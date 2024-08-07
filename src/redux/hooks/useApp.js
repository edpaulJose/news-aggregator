import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading as setLoadingSlice } from '../slices/appSlice';
import { selectIsloading } from '../store';

export const useApp = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsloading);

  const setLoading = useCallback(
    (value = false) => {
      dispatch(setLoadingSlice(value));
    },
    [dispatch]
  );

  return {
    isLoading,
    setLoading
  };
};
