import { stores } from '~stores/stores';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import {
  App
} from '~App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'mobx-react';
import {I18nextProvider} from "react-i18next";
import i18n from './i18n';
import {appService} from "~services/app.service";
import {sessionService} from "~services/session.service";

sessionService.init();
appService.init();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <I18nextProvider i18n={i18n}>
      <Provider  {...stores}>
        <App />
      </Provider>
  </I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
