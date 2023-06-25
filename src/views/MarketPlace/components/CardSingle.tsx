import React, { useEffect, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { cardback_normal, coin } from '../../../assets';
import { Title, Spacer, StyledSpacer,Text } from '../../../components';
import { theme } from '../../../theme';
import {
	ThirdwebNftMedia,
	useContract,
	useValidDirectListings,
	useValidEnglishAuctions,
} from '@thirdweb-dev/react';
import { NFT } from '@thirdweb-dev/sdk';
import {
	MARKETPLACE_ADDRESS,
	NFT_COLLECTION_ADDRESS,
} from '../../../constants';
import Skeleton from '../../../components/Skeleton/Skeleton';
import {
	StyledPepemonCardPrice,
	StoreAside,
	StyledStoreBody,
	StyledPepemonCardMeta,
} from '../../Store/components';

const CardSingle: React.FC<any> = ({
	nft,
	cardId,
	selectedCard,
	setSelectedCard,
}) => {
	const self = {
		cardId: nft.metadata.id && nft.metadata.id,
		nft: nft,
	};

	//console.log('selected Card', self);

	const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
		MARKETPLACE_ADDRESS,
		'marketplace-v3'
	);

	const { data: directListing, isLoading: loadingDirectListing } =
		useValidDirectListings(marketplace, {
			tokenContract: NFT_COLLECTION_ADDRESS,
			tokenId: nft.metadata.id,
		});

	//Add for auciton section
	const { data: auctionListing, isLoading: loadingAuction } =
		useValidEnglishAuctions(marketplace, {
			tokenContract: NFT_COLLECTION_ADDRESS,
			tokenId: nft.metadata.id,
		});

	//console.log(directListing, 'auctionListing');

	return (
		<div onClick={() => setSelectedCard(self)}>
			<Flex
				direction={'column'}
				backgroundColor={'#EEE'}
				justifyContent={'center'}
				padding={'2.5'}
				borderRadius={'6px'}
				borderColor={'lightgray'}
				borderWidth={1}>
				<Box borderRadius={'4px'} overflow={'hidden'}>
					<ThirdwebNftMedia
						metadata={nft.metadata}
						height={'100%'}
						width={'100%'}
					/>
				</Box>
				<Spacer size={'sm'} />
				<Text
					as='p'
					font={theme.font.inter}
					size='l'
					lineHeight={1.3}
					color={theme.color.gray[600]}>
					{nft.metadata.name}
				</Text>
        <Spacer size={'md'} /> 
				<Box>
					{loadingMarketplace || loadingDirectListing || loadingAuction ? (
						<Skeleton></Skeleton>
					) : directListing && directListing[0] ? (
						<Box>
							<StyledPepemonCardMeta>
								<dt>Price</dt>
								<dd>{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</dd>
							</StyledPepemonCardMeta>
						</Box>
					) : auctionListing && auctionListing[0] ? (
						<Box>
							<StyledPepemonCardMeta>
								<dt>Minimum Bid</dt>
								<dd>{`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}</dd>
							</StyledPepemonCardMeta>
						</Box>
					) : (
						<Box>
							<StyledPepemonCardMeta>
								<dt>Price</dt>

								<dd>Not Listed</dd>
							</StyledPepemonCardMeta>
						</Box>
					)}
				</Box>
			</Flex>
		</div>
	);
};

export default CardSingle;

interface FlexProps {
	direction?: string;
	backgroundColor?: string;
	justifyContent?: string;
	padding?: string;
	borderRadius?: string;
	borderColor?: string;
	borderWidth?: number;
	cursor?: string;
  boxShadow?: string;
}

const Flex = styled.div<FlexProps>`
	display: flex;
	flex-direction: ${(props) => props.direction || 'row'};
	justify-content: ${(props) => props.justifyContent || 'flex-start'};
	padding: ${(props) => props.padding || '5'};
	border-radius: ${(props) => props.borderRadius || '10'};
	border-color: ${(props) => props.borderColor || 'transparent'};
	border-width: ${(props) => props.borderWidth || 0}px;
	cursor: pointer;
`;

interface BoxProps {
	borderRadius?: string;
	overflow?: string;
}

const Box = styled.div<BoxProps>`
	border-radius: ${(props) => props.borderRadius || '0'};
	overflow: ${(props) => props.overflow || 'visible'};
`;

interface TextProps {
	fontSize?: string;
	color?: string;
	fontWeight?: string;
}

// const Text = styled.p<TextProps>`
// 	font-size: ${(props) => props.fontSize || 'medium'};
// 	color: ${(props) => props.color || 'inherit'};
// 	font-weight: ${(props) => props.fontWeight || 'normal'};
// `;
