export const toCurrency = (number, curr, LanguageFormat = undefined) => (
  Intl.NumberFormat(LanguageFormat, { style: 'currency', currency: curr }).format(number)
);

export const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

export const toDateTime = (date, version, locales = 'ru') => {
  const dateObj = new Date(date);
  switch (version) {
    case 'long':
      return new Intl.DateTimeFormat(locales, { dateStyle: 'medium', timeStyle: 'short' }).format(dateObj);
    case 'short':
      return new Intl.DateTimeFormat(locales, { dateStyle: 'short', timeStyle: 'short' }).format(dateObj);
    default:
      return new Intl.DateTimeFormat(locales, { dateStyle: 'short', timeStyle: 'short' }).format(dateObj);
  }
};

export const capitalize = (str) => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
