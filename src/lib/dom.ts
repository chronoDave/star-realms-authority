export const getElementById = <T>(id: string): T => {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Could not find element with id: "${id}"`);

  return element as T;
};

export const querySelector = <T>(query: string): T => {
  const element = document.querySelector(query);
  if (!element) throw new Error(`Could not find element with query: "${query}"`);

  return element as T;
};
