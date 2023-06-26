import React, { useEffect, useState, useContext } from 'react';
import {
	Title,
	Spacer,
	DropdownMenu,
	Text,

	// Button
} from '../../../components';

import Skeleton from '../../../components/Skeleton/Skeleton';

import { cardback_normal, coin } from "../../../assets";

import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";
import {
	MARKETPLACE_ADDRESS,
	NFT_COLLECTION_ADDRESS,
} from '../../../constants';

import {
	useAddress,
	useContract,
	useOwnedNFTs,
	ConnectWallet,
} from '@thirdweb-dev/react';

import { theme } from '../../../theme';
import {
	StyledStoreCardsWrapper,
	StyledStoreCardsInner,
	InnerDiv,
} from './../../Store/components';

import { useParams } from 'react-router-dom';

import CardSingle from './CardSingle';

const MarketPlaceSellCardsCollection: React.FC<any> = ({
	selectedCard,
	setSelectedCard,
}) => {
	const { contract } = useContract(NFT_COLLECTION_ADDRESS);
	const address = useAddress();
	const { data, isLoading } = useOwnedNFTs(contract, address);

	// console.log(data);
	

	const routerParams: any = useParams();

	// console.log(address);

	useEffect(() => {
		setSelectedCard(null);
	}, [setSelectedCard, routerParams.marketPlaceState]);

	return (
		<div>
			<StyledStoreCardsWrapper>
				<Title as='h3' size='m' font={theme.font.spaceMace}>
					Select which NFT you’d like to sell below.
				</Title>
				<Spacer size='md' />
				<StyledStoreCardsInner gridCols={selectedCard ? 3 : 5}>
					{isLoading ? (
						[...Array(5)].map((_, index) => (
							<StyledPepemonCardImage
							width="747"
							height="1038"
							effect="blur"
							src={cardback_normal}
							alt={"Loading card"}
						  />
						))
					) : address && data && data.length > 0 ? (
						data.map((nft, index) => {
							return (
								<CardSingle
									key={index}
									nft={nft}
									cardId={nft?.metadata?.id}
									selectedCard={selectedCard}
									setSelectedCard={setSelectedCard}
								/>
							);
						})
					) : !address ? (
						<div style={{ gridColumn: `1 / span ${selectedCard ? 3 : 5}`,  display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<Text
								as='p'
								size='l'
								lineHeight={1.3}
								align='center'
								color={theme.color.gray[600]}
								font-family={theme.font.spaceMace}>
								Looks like you're not connected to a wallet. Connect to a Web3 Wallet to get access to your NFTs.
								</Text>
								<Spacer size='md' />
								<div style={{alignItems:'center'}}>
								<ConnectWallet/>
								</div>
								<Spacer size='md' />
						</div>
					) : (
						<div style={{ gridColumn: `1 / span ${selectedCard ? 3 : 5}`, display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
							<Text
								as='p'
								size='l'
								lineHeight={1.3}
								align='center'
								color={theme.color.gray[600]}
								font-family={theme.font.spaceMace}>
								Looks like you don't own any NFts in this collection  - Head to
								the buy page to buy some!
							</Text>
							<Spacer size='md' />
							<Spacer size='md' />
						</div>
					)}
				</StyledStoreCardsInner>
			</StyledStoreCardsWrapper>
		</div>
	);
};

export default MarketPlaceSellCardsCollection;


export const StyledPepemonCardImage = styled(LazyLoadImage)<{
	active?: boolean;
  }>`
	filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12));
	height: auto;
	max-width: 25em;
	position: relative;
	width: 100%;
	z-index: 0;
	transition: filter 0.2s ease-in-out;
  
	${({ active }) =>
	  active &&
	  `
		  &{
			  filter: drop-shadow(0 0 50px #894fbe);
		  }
	  `}
  `;