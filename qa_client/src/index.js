import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Slack from './Adminsettings/Slack';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
 import reportWebVitals from './reportWebVitals';
//import * as serviceWorker from './serviceWorker';
ReactDOM.render(
    <I18nextProvider i18n={i18n}>
       <App/>,
       {/* <Slack/> */}
    </I18nextProvider>,
   document.getElementById('root'));

reportWebVitals();