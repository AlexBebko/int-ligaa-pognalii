import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/app';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <ToastContainer />
            <App />
        </Provider>
    </React.StrictMode>
);