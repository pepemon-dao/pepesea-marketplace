import React, { useEffect, useState, useContext } from 'react';
import {
	Title,
	Spacer,
	DropdownMenu,
	
	// Button
} from '../../../components';
import styled from "styled-components";
import Skeleton from '../../../components/Skeleton/Skeleton';

import {
	MARKETPLACE_ADDRESS,
	NFT_COLLECTION_ADDRESS,
} from '../../../constants';


import { LazyLoadImage } from "react-lazy-load-image-component";

import {
	useEnglishAuctions,
	useContract,
	useDirectListings,
	useNFTs,
} from '@thirdweb-dev/react';

import { theme } from '../../../theme';
import {
	StyledStoreCardsWrapper,
	StyledStoreCardsInner,
} from './../../Store/components';

import { useParams } from 'react-router-dom';

import CardSingle from './CardSingle';


import { cardback_normal, coin } from "../../../assets";

const MarketPlaceCardsCollection: React.FC<any> = ({
	selectedCard,
	setSelectedCard,
}) => {
	const { contract } = useContract(
		MARKETPLACE_ADDRESS,
		'marketplace-v3'
	);
	const {
		data: directListings,
		isLoading,
		error,
	} = useDirectListings(contract);

	const { data: englishAuctions } = useEnglishAuctions(contract);

	const { contract: nftsss } = useContract(
		NFT_COLLECTION_ADDRESS
	);

	const { data, isLoading: nftLoading } = useNFTs(nftsss);

	// console.log('nftLoad', data);

	// console.log('directlising', directListings);

	// console.log('englishAuction', englishAuctions);

	const routerParams: any = useParams();

	useEffect(() => {
		setSelectedCard(null);
	}, [setSelectedCard, routerParams.marketPlaceState]);

	return (
		<div>
			<StyledStoreCardsWrapper>
				<Title as='h3' size='m' font={theme.font.spaceMace}>
				Browse which NFTs are available from the collection.
				</Title>
				<Spacer size='md' />
				<StyledStoreCardsInner gridCols={selectedCard ? 3 : 5}>
				{nftLoading ? (
						[...Array(5)].map((_, index) => (
							<StyledPepemonCardImage
							width="747"
							height="1038"
							effect="blur"
							src={cardback_normal}
							alt={"Loading card"}
						  />
						))
					) : data && data.length > 0 ? (
						data.map((nft, index) => {
							return (
								<CardSingle
									key={index}
									nft={nft}
									selectedCard={selectedCard}
									setSelectedCard={setSelectedCard}
									cardId={nft?.metadata?.id}
								/>
							);
						})
					) : (
						<div>loading...</div>
					)}				
					</StyledStoreCardsInner>
			</StyledStoreCardsWrapper>
		</div>
	);
};

export default MarketPlaceCardsCollection;


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