import {
	MediaRenderer,
	ThirdwebNftMedia,
	Web3Button,
	useContract,
	useMinimumNextBid,
	useValidDirectListings,
	useValidEnglishAuctions,
} from '@thirdweb-dev/react';
import { NFT, ThirdwebSDK } from '@thirdweb-dev/sdk';
import React, { useState } from 'react';
import styled from "styled-components";
import {
	Button,
	ExternalLink,
	Title,
	Text,
	Spacer,
	StyledSpacer,
} from '../../../components';
import { ethers } from 'ethers';
import { cardback_normal, coin } from '../../../assets';
import { theme } from '../../../theme';
import {
	MARKETPLACE_ADDRESS,
	NFT_COLLECTION_ADDRESS,
} from '../../../constants';

import Skeleton from '../../../components/Skeleton/Skeleton';
import Input from '../../../components/Input/Input';

import {
	StoreAside,
	StyledStoreBody,
	StyledPepemonCardMeta,
} from '../../Store/components';

const MarketPlaceCardAside: React.FC<any> = ({
	setSelectedCard,
	selectedCard,
}) => {

	console.log('selected card: ',selectedCard);

	const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
		MARKETPLACE_ADDRESS,
		'marketplace-v3'
	);

	const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

	const { data: directListing, isLoading: loadingDirectListing } =
		useValidDirectListings(marketplace, {
			tokenContract: NFT_COLLECTION_ADDRESS,
			tokenId: selectedCard.nft.metadata.id,
		});

	// console.log(directListing, 'directListing from MarketPlaceCardAside.tsx');


	const [buyButton, setBuyButton] = useState<string>('Buy At Asking Rate');
	const [auctionButton, setAuctionButton] = useState<string>('Place Bid');

	const { data: auctionListing, isLoading: loadingAuction } =
		useValidEnglishAuctions(marketplace, {
			tokenContract: NFT_COLLECTION_ADDRESS,
			tokenId: selectedCard.nft.metadata.id,
		});

	const buyListing = async () => {
		let transactionResult: any;
		setBuyButton('Buying ...');
		try {
			if (auctionListing?.[0]) {
				transactionResult = await marketplace?.englishAuctions.buyoutAuction(
					auctionListing[0].id
				);
			} else if (directListing?.[0]) {
				transactionResult = await marketplace?.directListings.buyFromListing(
					directListing[0].id,
					1
				);
			}
			setBuyButton('Buy At Asking Rate');
			console.log(transactionResult, 'transactionResult');
			return transactionResult;
		} catch (e) {
			console.log('transaction error', e);
			setBuyButton('Buy At Asking Rate');
		}
	};

	const [auctionValue, setAuctionValue] = useState<string>(
		auctionListing
			? auctionListing?.[0]?.minimumBidCurrencyValue?.displayValue
			: '0'
	);

	// console.log(auctionValue, 'auctionValue');

	const createBidOffer = async () => {
		let txResult: any;

		console.log(auctionValue);

		if (!auctionValue) {
			return;
		}
		setAuctionButton('Placing Bid ...');
		try {
			if (auctionListing?.[0]) {
				txResult = await marketplace?.englishAuctions.makeBid(
					auctionListing[0].id,
					auctionValue
				);
			} else if (directListing?.[0]) {
				txResult = await marketplace?.offers.makeOffer({
					assetContractAddress: NFT_COLLECTION_ADDRESS,
					tokenId: selectedCard.nft.metadata.id,
					totalPrice: auctionValue,
				});
			}
			setAuctionButton('Place Bid');
			console.log(txResult, 'txResult');
			return txResult;
		} catch (e) {
			setAuctionButton('Place Bid');
			console.log('transaction error', e);
		}
	};

	// console.log(
	// 	loadingDirectListing,
	// 	'directlisting from MarketPlaceCardAside.tsx'
	// );
	// console.log(loadingAuction, 'auctionListing from MarketPlaceCardAside.tsx');

	// console.log(auctionListing, 'auctionListing from MarketPlaceCardAside.tsx');
	// console.log(directListing, 'directlisting from MarketPlaceCardAside.tsx');

	const handleChange = (e: any) => {
		setAuctionValue(e.target.value);
	};

	return (
		<StoreAside close={() => setSelectedCard('')} title='Selected Card'>
			<StyledStoreBody>
				<Text
					as='p'
					font={theme.font.inter}
					size='l'
					lineHeight={1.3}
					color={theme.color.gray[600]}>
					{selectedCard ? selectedCard.nft.metadata.name : 'Loading card'}
				</Text>
				<Spacer size='sm' />
				<Text
					as='p'
					font={theme.font.inter}
					size='s'
					lineHeight={1.3}
					color={theme.color.gray[600]}>
					{selectedCard
						? selectedCard.nft.metadata.description
						: 'Loading card'}
				</Text>
				<Spacer size='md' />
				<img
					loading='lazy'
					src={selectedCard ? selectedCard.nft.metadata.image : 'Loading card'}
					alt={selectedCard ? selectedCard.nft.metadata.name : 'Loading card'}
					style={{ width: '100%' }}
				/>
				<Spacer size='sm' />
				<StyledSpacer bg={theme.color.gray[100]} size={2} />

				{directListing && directListing[0] ? (
					<>
						<StyledPepemonCardMeta>
							<dt>Price:</dt>
							<dd>
								<StyledPepemonCardPrice styling='alt'>
									{selectedCard
										? directListing[0]?.currencyValuePerToken.displayValue
										: 'Loading'}{' '}
									{selectedCard
										? directListing[0]?.currencyValuePerToken.symbol
										: 'Loading'}
									<Spacer size='sm' />
									<img loading='lazy' src={coin} alt='coin' />
								</StyledPepemonCardPrice>
							</dd>
						</StyledPepemonCardMeta>
					</>
				) : auctionListing && auctionListing[0] ? (
					<>
						<StyledPepemonCardMeta>
							<dt>Buyout Price:</dt>
							<dd>
								<StyledPepemonCardPrice styling='alt'>
									{selectedCard
										? auctionListing[0]?.buyoutCurrencyValue.displayValue
										: 'Loading'}{' '}
									{selectedCard
										? auctionListing[0]?.buyoutCurrencyValue.symbol
										: 'Loading'}
									<Spacer size='sm' />
									<img loading='lazy' src={coin} alt='coin' />
								</StyledPepemonCardPrice>
							</dd>
						</StyledPepemonCardMeta>

						<Spacer size='sm' />

						<StyledPepemonCardMeta>
							<dt>Bids starting from</dt>
							<dd>
								<StyledPepemonCardPrice styling='alt'>
									{selectedCard
										? auctionListing[0]?.minimumBidCurrencyValue.displayValue
										: 'Loading'}{' '}
									{selectedCard
										? auctionListing[0]?.minimumBidCurrencyValue.symbol
										: 'Loading'}
									<Spacer size='sm' />
									<img loading='lazy' src={coin} alt='coin' />
								</StyledPepemonCardPrice>
							</dd>
						</StyledPepemonCardMeta>
					</>
				) : (
					<>
						<StyledPepemonCardMeta>
							<dt>Price:</dt>
							<dd>
								<StyledPepemonCardPrice styling='alt'>
									{selectedCard && 'Not for sale'}
								</StyledPepemonCardPrice>
							</dd>
						</StyledPepemonCardMeta>
					</>
				)}

				<Spacer size='sm' />

				<Skeleton
					isLoaded={loadingDirectListing === false || loadingAuction === false}>
					{directListing?.[0] || auctionListing?.[0] ? (
						<>	
						

							<Button
								width='100%'
								styling='purple'
								onClick={async () => buyListing()}>
								{buyButton}
							</Button>

							<p style={{ textAlign: 'center' }}>Or</p>

							<Input
								mb={5}
								defaultValue={
									auctionListing
										? auctionListing?.[0]?.minimumBidCurrencyValue?.displayValue
										: 0
								}
								type={'number'}
								onChange={handleChange}
							/>

							<Spacer size='sm' />

							<Button
								width='100%'
								styling='purple'
								onClick={async () => createBidOffer()}>
								{auctionButton}
							</Button>
						</>
					) : (
						<Button width='100%' disabled={true}>
							Not For Sale
						</Button>
					)}
				</Skeleton>
			</StyledStoreBody>
		</StoreAside>
	);
};

export default MarketPlaceCardAside;


export const StyledPepemonCardPrice = styled.span<{ styling?: string }>`
  & {
    background-color: ${(props) =>
      props.styling === "alt"
        ? props.theme.color.white
        : props.theme.color.black};
    color: ${(props) =>
      props.styling === "alt"
        ? props.theme.color.black
        : props.theme.color.white};
    font-family: ${(props) => props.theme.font.spaceMace};
    border-radius: 6px;
    display: inline-flex;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    padding: ${(props) => (props.styling === "alt" ? "" : "2px 8px")};
    font-size: ${(props) => (props.styling === "alt" ? "1rem" : ".8rem")};
    transform: ${(props) => (props.styling === "alt" ? "" : "translateY(40%)")};
    position: relative;
    z-index: 1;
  }

  & img {
    width: 1.8em;
  }
`;