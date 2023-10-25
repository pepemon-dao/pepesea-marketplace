import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {
	ThirdwebProvider,
	metamaskWallet,
	coinbaseWallet,
} from '@thirdweb-dev/react';
import { Ethereum } from "@thirdweb-dev/chains";
import './index.css';
// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

const activeChain = {
	chainId: 906090, // Chain ID of the network
	// Array of RPC URLs to use
	rpc: ['https://l2-pepechain-testnet-8uk55qlld4.t.conduit.xyz'],

	// === Information for adding the network to your wallet (how it will appear for first time users) === \\
	// Information about the chains native currency (i.e. the currency that is used to pay for gas)
	nativeCurrency: {
		decimals: 18,
		name: 'PEPE ETH',
		symbol: 'pepETH',
	},
	shortName: 'pepechain-testnet', // Display value shown in the wallet UI
	slug: 'conduit:pepechain-testnet-8uk55qlld4', // Display value shown in the wallet UI
	testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
	chain: 'pepechain-testnet', // Name of the network
	name: 'pepechain-testnet',
};
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
	<ThirdwebProvider activeChain="ethereum" clientId="dbe887550602ce19ddcc82041fdc6f01" >
		<App />
	</ThirdwebProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
