export const toCurrency = (number, curr, LanguageFormat = undefined) => (
  Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr }).format(number)
);

export const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

export const capitalize = (str) => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
