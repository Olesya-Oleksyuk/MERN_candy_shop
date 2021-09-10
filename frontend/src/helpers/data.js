export const toCurrency = (number, curr, LanguageFormat = undefined) => (
  Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr }).format(number)
);
