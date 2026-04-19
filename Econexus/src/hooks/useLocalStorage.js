import { useState, useEffect } from 'react';

/**
 * Hook personalizado para sincronizar estado con localStorage.
 * Si no hay datos guardados, usa el valor inicial proporcionado.
 *
 * @param {string} key - Clave en localStorage
 * @param {*} initialValue - Valor por defecto si no hay datos guardados
 * @returns {[*, Function]} - [valor, setValue]
 */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error leyendo localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error escribiendo localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
