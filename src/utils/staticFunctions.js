export const isNil = value => value === null || value === undefined;

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

export const getCountryCode = () => {
  try {
    // Get the user's locale
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    // Extract the country code from the locale (e.g., 'en-US' -> 'US')
    const countryCode = locale.split('-')[1];

    // Check if the country code is 2 letters long
    if (countryCode && countryCode.length === 2) {
      return countryCode.toUpperCase();
    } else {
      console.error('Invalid country code format.');
      return null;
    }
  } catch (error) {
    console.error('Error getting country code:', error);
    return null;
  }
};
