import { useEffect, useState } from 'react';

function useDebounce(value:any, delay:number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timeout to update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear timeout if value or delay changes before timeout is triggered
    return () => {
      clearTimeout(handler);
    };
  }, [value]); // Re-run effect if value or delay changes

  return debouncedValue;
}

export default useDebounce;