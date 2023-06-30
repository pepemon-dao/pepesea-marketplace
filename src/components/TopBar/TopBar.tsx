import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
import { isMobile } from 'web3modal';
import { copyText, formatAddress } from '../../utils';
import { Button, Text } from '../../components';
import { NetworkSwitch, WalletModal } from './components';
import { theme } from '../../theme';
import { useModal } from '../../hooks';

import {
	ConnectWallet,
	useAddress,
	useConnect,
	metamaskWallet,
} from '@thirdweb-dev/react';

import { WalletConnect } from '../ConnectWallet';

const TopBar: React.FC<any> = () => {
	const account = useAddress();
	const connect = useConnect();
	const metamaskConfig = metamaskWallet();


	const handleConnect = async () => {
		// try {
			
		// } catch (e) {
		// 	console.log(e);
		// }
	}



	return (
		<StyledTopBar>
			<StyledTopBarInner>
				{account && !isMobile() && (
					<StyledTopBarInfo>
						<TextInfo
							as='div'
							style={{ borderRight: '1px solid currentColor' }}></TextInfo>
					</StyledTopBarInfo>
				)}
				{account && <ConnectWallet
					detailsBtn={() => (
						<Button styling='green' title='Connect wallet'>
							{!account ? 'Connect wallet' : formatAddress(account)}
						</Button>
					)}
					/>}
 
                     {
						!account && <WalletConnect/>
					}
			</StyledTopBarInner>
		</StyledTopBar>
	);
};

const StyledTopBar = styled.div<{ border?: boolean }>`
	background-color: ${(props) => props.border && 'rgba(255, 255, 255, .6)'};
	border-radius: 10px;
	border: ${(props) => props.border && `1px solid ${theme.color.purple[800]}`};
	padding: ${(props) => props.border && '.25em'};
	position: fixed;
	right: 0.6em;
	top: 1em;
	z-index: 40;

	@media (min-width: ${theme.breakpoints.desktop}) {
		position: absolute;
		right: 2.5em;
		top: 2em;
	}
`;

const StyledTopBarInner = styled.div`
	align-items: center;
	display: flex;
`;

const StyledTopBarInfo = styled.div`
	align-items: center;
	display: none;

	@media (min-width: ${theme.breakpoints.desktop}) {
		display: flex;
	}
`;

const TextInfo = styled(Text)`
	color: ${theme.color.purple[800]};
	font: ${theme.font.spaceMace};
	padding: 0.4em 1em;
`;




export default TopBar;
