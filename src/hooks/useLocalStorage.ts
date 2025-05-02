// import { useState, useEffect } from 'react';

// function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.error(error);
//       return initialValue;
//     }
//   });

//   const setValue = (value: T) => {
//     try {
//       setStoredValue(value);
//       window.localStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return [storedValue, setValue];
// }

// export default useLocalStorage;


import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;