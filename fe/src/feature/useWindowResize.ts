import { useState, useEffect, useCallback, useMemo } from "react";

interface WindowSize {
  width: number;
  height: number;
}

// Debounce function
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

function useWindowSize(debounceMs: number = 100): WindowSize {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState<WindowSize>(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }));

  // Memoize the debounced resize handler
  const debouncedHandleResize = useMemo(
    () => debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, debounceMs),
    [debounceMs]
  );

  // Memoize the resize handler
  const handleResize = useCallback(() => {
    debouncedHandleResize();
  }, [debouncedHandleResize]);

  useEffect(() => {
    // Only add event listener on client side
    if (typeof window === 'undefined') return;

    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return windowSize;
}

export default useWindowSize;
