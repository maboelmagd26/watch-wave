import { useEffect, useState } from "react";

/** Returns `value` only after it has stopped changing for `delay` ms. */
export default function useDebouncedValue<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(id); // typing again cancels the pending update
  }, [value, delay]);

  return debouncedValue;
}
