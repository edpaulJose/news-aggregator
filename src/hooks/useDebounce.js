import { useState, useEffect } from 'react';

const useDebounce = (value, delay = 3000) => {
  const [debounceValue, setDebounceValue] = useState();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeOut);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
