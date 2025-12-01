import axios from 'axios';

/**
 * Fetches the list of products from the API, optionally filtered by category.
 *
 * @param {string} [categoryIri] - The IRI of the category to filter products by.
 * @returns {Promise} A promise that resolves to the list of products.
 */
export function getProducts(categoryIri) {
    const params = {};
    if (categoryIri) {
        params.category = categoryIri;
    }

    return axios.get('/api/products', { params });
}
