import axios from 'axios';

/**
 * Fetches the list of products from the API, optionally filtered by category.
 *
 * @param {string} [searchTerm] - The term to search products by name.
 * @param {string} [categoryIri] - The IRI of the category to filter products by.
 * @returns {Promise} A promise that resolves to the list of products.
 */
export function fetchProducts(categoryIri, searchTerm) {
    const params = {};
    if (categoryIri) {
        params.category = categoryIri;
    }

    if (searchTerm) {
        params.name = searchTerm;
    }

    return axios.get('/api/products', { params });
}

export function fetchFeaturedProducts() {
    return axios.get('/api/products', {
        params: { featured: true },
    });
}

/**
 * Fetches a single product by its IRI.
 *
 * @param {string} iri - The IRI of the product to fetch.
 * @returns {Promise} A promise that resolves to the product data.
 */
export function fetchOneProduct(iri) {
    return axios.get(iri);
}

/**
 * Retrieves a set of products identified by an array of IRIs
 *
 * @param {string[]} ids
 * @return {Promise}
 */
export function fetchProductsById(ids) {
    if (!ids.length) {
        return Promise.resolve({ data: { 'hydra:member': [] } });
    }

    return axios.get('/api/products', {
        params: { id: ids },
    });
}
