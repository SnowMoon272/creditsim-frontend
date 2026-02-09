import { useState } from "react";

/**
 * Hook personalizado para usar localStorage de forma reactiva
 * Funciona como useState pero persiste los datos en el navegador
 *
 * @param key - Clave para identificar el dato en localStorage
 * @param initialValue - Valor inicial si no existe nada en localStorage
 * @returns [storedValue, setValue] - Similar a useState
 */
function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para almacenar el valor
  // Pasar función inicial a useState para que solo se ejecute una vez
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // Obtener del localStorage por key
      const item = window.localStorage.getItem(key);

      // Parsear JSON almacenado o devolver initialValue si no existe
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si hay error al parsear, devolver valor inicial
      console.error(`Error al leer localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para actualizar el valor en localStorage y en el estado
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que value sea una función como en useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Guardar en el estado
      setStoredValue(valueToStore);

      // Guardar en localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Manejar cualquier error al guardar
      console.error(`Error al guardar en localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;

