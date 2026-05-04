export const devError = (...args) => {
  if (import.meta.env.DEV) console.error(...args);
};
