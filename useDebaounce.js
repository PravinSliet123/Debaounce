import { useEffect, useRef } from "react";

function useDebounce(callback, delay, target = window) {
  const timer = useRef();

  const debouncedFunction = (...args) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    const element = target === window ? window : target.current;
    if (!element) return;

    const handler = (e) => debouncedFunction(e);
    element.addEventListener("scroll", handler);

    return () => {
      element.removeEventListener("scroll", handler);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [target, debouncedFunction]);

  return debouncedFunction;
}

export default useDebounce;
