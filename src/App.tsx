import React, { Suspense, lazy } from 'react';
import { useEnglishAuctions, useContract ,ConnectWallet} from '@thirdweb-dev/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from 'styled-components';
import { ModalsProvider, PepemonProvider } from './contexts';
import { theme } from './theme';
import { Page, ScrollToTop,TopBar } from './components';

import { withConnectedWallet } from './hocs';
import { metas, LoadingPage } from './views';

const MarketPlace = lazy(() =>
	import('./views/MarketPlace').then((module) => ({
		default: module.default,
	}))
);

const TermsOfService = lazy(() =>
	import('./views/TermsOfService').then((module) => ({
		default: module.default,
	}))
);


const Error404 = lazy(() =>
	import('./views/Error404').then((module) => ({ default: module.default }))
);



const MarketPlaceWithAuth = withConnectedWallet(MarketPlace, {
	metas: metas.marketPlaceMeta,
});

export default function Home() {


	return (
		<Providers>
			<TopBar />
			<Page>
				<Suspense fallback={<LoadingPage />}>
					<Switch>
						<Route path='/:marketPlaceState(buyNfts|sellNfts)?'>
							<MarketPlaceWithAuth/>
						</Route>
						<Route path='/terms-of-service' component={TermsOfService} />
						
						<Route path={['/events', '/my-collection']}>
							<Error404 title='This page will be available soon👀' />
						</Route>
						<Route component={Error404} />
					</Switch>

					<ScrollToTop />
				</Suspense>
			</Page>
		</Providers>
	);
}
const Providers: React.FC<any> = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<PepemonProvider>
					<ModalsProvider>{children}</ModalsProvider>
				</PepemonProvider>
			</Router>
		</ThemeProvider>
	);
};
