import axios from 'axios';

/*
 * Welcome to your app's main JavaScript file!
 */

// any CSS you import will output into a single css file (app.css in this case)
import 'styles/app.scss';

// Interceptor dla wszystkich requestów
axios.interceptors.request.use(config => {
    // Jeśli request idzie do /api/, ustaw odpowiednie headery
    if (config.url && config.url.startsWith('/api/')) {
        config.headers['Content-Type'] = 'application/ld+json';
        config.headers['Accept'] = 'application/ld+json';
    }
    return config;
});
