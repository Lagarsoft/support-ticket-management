import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import {store} from 'config/store'

import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.baseURL= process.env.REACT_APP_API_BASE_URL
axios.interceptors.request.use((config) => {
    config.params = config.params || {};
    config.params['token'] = process.env.REACT_APP_ARCHILOGIC_PUBLISHABLE_API_KEY;

    return config;
}, (error) => {
    return Promise.reject(error);
});




ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
