/**
 * Fetch categories from the global window object
 * @return {Promise<Object>} Promise resolving to an object containing categories data
 */
export function getCategories() {
    return new Promise(resolve => {
        resolve({
            data: {
                'hydra:member': window.categories,
            },
        });
    });
}
