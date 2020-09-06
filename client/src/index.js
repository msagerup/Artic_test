import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import history from './utils/history';
import './index.css';
import 'nprogress/nprogress.css';
// Sentry
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
// Immer
import { enableES5 } from 'immer';
// Auth0
import { Auth0Provider as Auth } from '@auth0/auth0-react';
// Redux
import { configureStore } from './store';
import { Provider } from 'react-redux';

const store = configureStore();

// Suppport for older JavaScript environments.
enableES5();

// Enable Sentry
Sentry.init({
	// Lar dette ligge her for presentasjon, dette burde ligge i en udelt mappe, slik som forkaringen ved Auth nedenfor.
  dsn: "https://59b91f0ea056489da848677a3920e76a@o441984.ingest.sentry.io/5412944",
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

const onRedirectCallback = (appState) => {
  history.push('/lookup');
};

ReactDOM.render(
	<Provider store={store}>
		<Auth
			// Informasjonen ville vanligvis ligge i et objekt i en egen mappe som ikke deles paa github pga. sikkerhet.
			// Dette ville da f.eks se slik ut :
			// domain = {../secret/config.domain}
			// clientId = {../secret/config.domain}
			// ---- 
			// For presentasjonen lar jeg de ligge her.
			domain='dev-etcvlnyv.eu.auth0.com'
			clientId='ZBan2YvtVTB9YDebAaWikT2J1g7ZsInh'
			redirectUri={window.location.origin}
			onRedirectCallback={onRedirectCallback}
		>
			<App />
		</Auth>
	</Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
