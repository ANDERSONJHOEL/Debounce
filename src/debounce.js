// debounce.js

export function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    // Cancelar el timeout anterior si existe
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Crear un nuevo timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}