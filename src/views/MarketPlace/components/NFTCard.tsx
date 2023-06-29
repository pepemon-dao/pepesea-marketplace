import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
	Badge,
	StyledLinkTitle,
	Title,
	Text,
	Spacer,
	Button,
	TopBar,
} from '../../../components';
import { theme } from '../../../theme';
import { Link, Redirect, useParams } from 'react-router-dom';

import {
	StyledStoreWrapper,
	StyledStoreHeader,
	StyledStoreBody,
} from '../../Store/components';

import {
	ConnectWallet,
	useNetworkMismatch,
	useChain,
	useSwitchChain,
} from '@thirdweb-dev/react';

import MarketPlaceCardAside from './MarketPlaceCardAside';
import MarketPlaceCardsCollection from './MarketPlaceCardsCollection';
import MarketPlaceSellCardsCollection from './MarketPlaceSellCardsCollection';
import MarketPlaceSellCardAside from './MarketPlaceSellCardAside';

const NFTCard: React.FC<any> = () => {
	const routerParams: any = useParams();
	const [selectedCard, setSelectedCard] = useState(null);
	const isMismatched = useNetworkMismatch();
	const chain = useChain();
	const switchChain = useSwitchChain();
	// console.log('chain: ', chain);

	const itemSelected =
		selectedCard &&
		(routerParams.marketPlaceState === 'buyNfts' ||
			routerParams.marketPlaceState === 'sellNfts');

	// console.log('isMismatched: ', isMismatched);

	const handleSwitchChain = async() => {

		try{

			await switchChain(906090);

		}catch(e){

			console.log(e)

		}

	}

	const storeWidth = () => {
		if (itemSelected) return 'calc(60% + .5em)';
		return '100%';
	};

	useEffect(() => {
		if (
			routerParams.marketPlaceState === 'buyNfts' ||
			routerParams.marketPlaceState === 'sellNfts'
		) {
			selectedCard && setSelectedCard(null);
		}
	}, [routerParams.marketPlaceState]);

	if (!routerParams.marketPlaceState) return <Redirect to='/buyNfts' />;

	return (
		<div style={{ display: 'flex', position: 'relative' }}>
			<StyledStoreWrapper width={storeWidth()} itemSelected={itemSelected}>
				<StyledStoreHeader>
					<div style={{ display: 'flex' }}>
						<StyledLinkTitle
							isInactive={routerParams.marketPlaceState !== 'buyNfts'}>
							<Link to={`/buyNfts`}>1. Buy NFTs</Link>
						</StyledLinkTitle>
						<StyledLinkTitle
							isInactive={routerParams.marketPlaceState !== 'sellNfts'}>
							<Link to={`/sellNfts`}>2. Sell NFTs</Link>
						</StyledLinkTitle>
					</div>
					<ConnectWallet />
					{isMismatched && (
						<button onClick={async () => handleSwitchChain()}>Switch to PEPE</button>
					)}
				</StyledStoreHeader>

				<StyledStoreBody>
					{routerParams.marketPlaceState === 'buyNfts' && (
						<>
							<MarketPlaceCardsCollection
								setSelectedCard={setSelectedCard}
								selectedCard={selectedCard}
							/>
						</>
					)}
					{routerParams.marketPlaceState === 'sellNfts' && (
						<>
							<MarketPlaceSellCardsCollection
								setSelectedCard={setSelectedCard}
								selectedCard={selectedCard}
							/>
						</>
					)}
				</StyledStoreBody>
			</StyledStoreWrapper>
			{selectedCard && routerParams.marketPlaceState === 'buyNfts' && (
				<MarketPlaceCardAside
					setSelectedCard={setSelectedCard}
					selectedCard={selectedCard}
				/>
			)}

			{selectedCard && routerParams.marketPlaceState === 'sellNfts' && (
				<MarketPlaceSellCardAside
					setSelectedCard={setSelectedCard}
					selectedCard={selectedCard}
				/>
			)}
		</div>
	);
};

export default NFTCard;
