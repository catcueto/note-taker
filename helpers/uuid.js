// This will mmediately export a function that generates a string of random numbers and letters
module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

// Math.floor rounds a decimal down to the nearest integer
// Math.random will return random intergers (0-1)
// .toString will return a number as a string (text)
