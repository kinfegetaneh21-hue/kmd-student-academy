export const formatETB = (n) => `${Number(n).toLocaleString()} ETB`;
export const formatUSD = (n) => `$${Number(n).toLocaleString()}`;
export const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
export const pluralize = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
