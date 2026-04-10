export const debounce = <T, K>(fn: (x: T) => K) => {
  let id: number;

  return (x: T) => {
    if (id) cancelAnimationFrame(id);
    id = requestAnimationFrame(() => fn(x));
  };
};
