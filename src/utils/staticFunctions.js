export const isNil = value => value === null || value === undefined;

export const isEqualIgnoreCase = (str1 = '', str2 = '') =>
  str1.toLowerCase() === str2.toLowerCase();

export const isEmptyArray = (arr = []) => arr.length === 0;

export const isEmptyOrNilArray = arr => isNil(arr) || isEmptyArray(arr);

export const capitalizeFirstLetters = str => {
  if (!str) return ''; // Handle null, undefined, and empty strings

  return str
    .toLowerCase() // Convert the entire string to lowercase
    .split(' ') // Split the string into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' '); // Join the words back into a single string
};

export const objectToQueryParams = obj => {
  if (typeof obj !== 'object') {
    return '';
  }
  return Object.keys(obj)
    .filter(key => obj[key])
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    .join('&');
};
