import {
	useMinimumNextBid,
	useValidDirectListings,
	useValidEnglishAuctions,
	useContract,
	useCreateAuctionListing,
	useCreateDirectListing,
} from '@thirdweb-dev/react';
import { NFT, ThirdwebSDK } from '@thirdweb-dev/sdk';
import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Stack,
} from '../../../components/Tab';

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
	StyledPepemonCardPrice,
	StoreAside,
	StyledStoreBody,
	StyledPepemonCardMeta,
} from '../../Store/components';

type DirectFormData = {
	nftContractAddress: string;
	tokenId: string;
	price: string;
	startDate: Date;
	endDate: Date;
};

//Add for Auction
type AuctionFormData = {
	nftContractAddress: string;
	tokenId: string;
	startDate: Date;
	endDate: Date;
	floorPrice: string;
	buyoutPrice: string;
};

const MarketPlaceSellCardAside: React.FC<any> = ({
	setSelectedCard,
	selectedCard,
}) => {

	const [errorMsg, setErrorMsg] = useState<string>('');

	useEffect(() => {	
		setErrorMsg('');
	}
	, [selectedCard]);

	const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
		MARKETPLACE_ADDRESS,
		'marketplace-v3'
	);

	const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

	const { mutateAsync: createDirectListing } =
		useCreateDirectListing(marketplace);

	const checkAndProvideApproval = async () => {
		setErrorMsg('')
		try {
			const hasApproval = await nftCollection?.call('isApprovedForAll', [
				selectedCard.nft.owner,
				MARKETPLACE_ADDRESS,
			]);

			if (!hasApproval) {
				const txResult = await nftCollection?.call('setApprovalForAll', [
					MARKETPLACE_ADDRESS,
					true,
				]);

				if (txResult) {
					console.log('Approval provided', txResult);
				}
			}
			setErrorMsg('')
			return true;
		} catch (err) {
			setErrorMsg('Something went wrong. Please check your credential')
			console.log(err);
		}
	};

	const [directButton, setDirectButton] = useState<string>(
		'Create Direct Listing'
	);
	const [auctionButton, setAuctionButton] = useState<string>('Create Auction');

	const [activeTab, setActiveTab] = useState(0);

	const handleTabClick = (tabIndex: any) => {
		setActiveTab(tabIndex);
		setErrorMsg('')
	};

	const { register: registerDirect, handleSubmit: handleSubmitDirect } =
		useForm<DirectFormData>({
			defaultValues: {
				nftContractAddress: NFT_COLLECTION_ADDRESS,
				tokenId: selectedCard.nft.metadata.id,
				price: '0',
				startDate: new Date(),
				endDate: new Date(),
			},
		});


	const handleSubmissionDirect = async (data: DirectFormData) => {

		setErrorMsg('')
		
		setDirectButton('Creating Direct Listing...');

		try {
			await checkAndProvideApproval();
			const txResult = await createDirectListing({
				assetContractAddress: data.nftContractAddress,
				tokenId: data.tokenId,
				pricePerToken: data.price,
				startTimestamp: new Date(data.startDate),
				endTimestamp: new Date(data.endDate),
			});
			console.log('Direct Listing transaction', txResult);
			setSelectedCard('');
			setDirectButton('Create Direct Listing');
			setErrorMsg('')
			return txResult;
		} catch (err:any) {
			setErrorMsg('Something went wrong. Please check your credential')
			setDirectButton('Create Direct Listing');
			const errorMessage = err[0]?.message;
			console.log('Direct Listing error: ', errorMessage);
		}
	};

	const { mutateAsync: createAuctionListing } =
		useCreateAuctionListing(marketplace);

	const { register: registerAuction, handleSubmit: handleSubmitAuction } =
		useForm<AuctionFormData>({
			defaultValues: {
				nftContractAddress: NFT_COLLECTION_ADDRESS,
				tokenId: selectedCard.nft.metadata.id,
				startDate: new Date(),
				endDate: new Date(),
				floorPrice: '0',
				buyoutPrice: '0',
			},
		});

	const handleSubmissionAuction = async (data: AuctionFormData) => {
		setAuctionButton('Creating Auction...');
		setErrorMsg('')
		try {
			await checkAndProvideApproval();
			const txResult = await createAuctionListing({
				assetContractAddress: data.nftContractAddress,
				tokenId: data.tokenId,
				buyoutBidAmount: data.buyoutPrice,
				minimumBidAmount: data.floorPrice,
				startTimestamp: new Date(data.startDate),
				endTimestamp: new Date(data.endDate),
			});
			setAuctionButton('Create Auction');
			setSelectedCard('');
			console.log('auction', txResult);
			setErrorMsg('')
			return txResult;
		} catch (err) {
			setErrorMsg('Something went wrong. Please check your credential')
			setAuctionButton('Create Auction');
			console.log('auction', err);
		}
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

				<Spacer size='md' />

				<Skeleton isLoaded={loadingMarketplace === false}>
					<Tabs>
						<TabList>
							<Tab isActive={activeTab === 0} onClick={() => handleTabClick(0)}>
								Direct List NFt
							</Tab>
							<Tab isActive={activeTab === 1} onClick={() => handleTabClick(1)}>
								Auction NFt
							</Tab>
						</TabList>
						<TabPanels>
							<TabPanel isActive={activeTab === 0}>
								<Spacer size='md' />

								<Text
									as='p'
									font={theme.font.inter}
									size='s'
									lineHeight={1.3}
									color={theme.color.gray[600]}>
									Listing starts on:
								</Text>
								<Spacer size='sm' />
								<Input
									placeholder='Select Listing Start Date'
									type='datetime-local'
									{...registerDirect('startDate')}
								/>

								<Spacer size='sm' />

								<Text
									as='p'
									font={theme.font.inter}
									size='s'
									lineHeight={1.3}
									color={theme.color.gray[600]}>
									Listing Ends on:
								</Text>
								<Spacer size='sm' />

								<Input
									placeholder='Select End Date'
									type='datetime-local'
									{...registerDirect('endDate')}
								/>

								<Spacer size='sm' />

								<Text
									as='p'
									font={theme.font.inter}
									size='s'
									lineHeight={1.3}
									color={theme.color.gray[600]}>
									Price:
								</Text>
								<Spacer size='sm' />

								<Input
									placeholder='Set Price'
									type='number'
									{...registerDirect('price')}
								/>

								<Spacer size='md' />

								<Button
									width='100%'
									styling='purple'
									onClick={async () => {
										await handleSubmitDirect(handleSubmissionDirect)();
									}}>
									{directButton}
								</Button>
							</TabPanel>
							<TabPanel isActive={activeTab === 1}>
								<Spacer size='md' />

								<Text
									as='p'
									font={theme.font.inter}
									size='s'
									lineHeight={1.3}
									color={theme.color.gray[600]}>
									Listing starts on:
								</Text>
								<Spacer size='sm' />
								<Input
									placeholder='Select Listing Date'
									type='datetime-local'
									{...registerAuction('startDate')}
								/>

								<Spacer size='sm' />

								<Text
									as='p'
									font={theme.font.inter}
									size='s'
									lineHeight={1.3}
									color={theme.color.gray[600]}>
									Listing Ends on:
								</Text>
								<Spacer size='sm' />

								<Input
									placeholder='Select End Date'
									type='datetime-local'
									{...registerAuction('endDate')}
								/>

								<Spacer size='sm' />

								<Text
									as='p'
									font={theme.font.inter}
									size='s'
									lineHeight={1.3}
									color={theme.color.gray[600]}>
									Starting Bid From:
								</Text>

								<Spacer size='sm' />

								<Input
									placeholder='Auction Starting Bid'
									type='number'
									{...registerAuction('floorPrice')}
								/>

								<Spacer size='sm' />

								<Text
									as='p'
									font={theme.font.inter}
									size='s'
									lineHeight={1.3}
									color={theme.color.gray[600]}>
									Buyout Price:
								</Text>

								<Spacer size='sm' />

								<Input
									placeholder='Buyout Price'
									type='number'
									{...registerAuction('buyoutPrice')}
								/>

								<Spacer size='md' />

								<Button
									width='100%'
									styling='purple'
									onClick={async () => {
										return await handleSubmitAuction(handleSubmissionAuction)();
									}}>
									{auctionButton}
								</Button>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Skeleton>
				<Spacer size='sm' />

					{errorMsg && <Text color={'red'}>{errorMsg}</Text>}
			</StyledStoreBody>
		</StoreAside>
	);
};

export default MarketPlaceSellCardAside;
