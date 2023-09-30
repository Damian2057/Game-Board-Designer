import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import i18next from "i18next";

import enTranslation from './i18n/en/translation.json';
import plTranslation from './i18n/pl/translation.json';
import {I18nextProvider} from "react-i18next";

i18next.init({
    interpolation: { escapeValue: false },
    lng: 'en',
    resources: {
        en: {
            translation: enTranslation,
        },
        pl: {
            translation: plTranslation,
        },
    },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <App />
        </I18nextProvider>
    </React.StrictMode>
);
reportWebVitals();
