/**
 * Formats a price in cents to a string in dollars with two decimal places.
 * @param {number} price - The price in cents.
 * @returns {string} The formatted price in dollars.
 */
export default price => (price / 100).toLocaleString('en-US', { minimumFractionDigits: 2 });
