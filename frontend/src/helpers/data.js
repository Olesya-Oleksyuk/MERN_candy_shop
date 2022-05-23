export const toCurrency = (number, curr, LanguageFormat = undefined) => (
  Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr }).format(number)
);

export const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
