import axios from 'axios';

/**
 * Makes a POST request to create a new order.
 *
 * @param {Object} orderData
 * @returns {Promise}
 */
export function createOrder(orderData) {
    return axios.post('/api/purchases', orderData);
}
