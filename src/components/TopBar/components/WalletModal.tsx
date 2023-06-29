import React, { useContext } from 'react';
import styled from 'styled-components';
import { isMobile } from 'web3modal';
import { ExternalLink, ModalProps, Text } from '../../../components';
import NetworkSwitch from './NetworkSwitch';
import { PepemonProviderContext } from '../../../contexts';
import { theme } from '../../../theme';
import { chains } from '../../../constants';

interface WalletModalProps extends ModalProps {
	account: string,
	setChainId?: () => void,
}

const WalletModal: React.FC<WalletModalProps> = ({ account, setChainId }) => {
	return (
		<>
			<StyledTextInfos>
				{isMobile() && (
					<>
						<dt>Change network:</dt>
						<dd>
							<NetworkSwitch />
						</dd>
					</>
				)}
			</StyledTextInfos>

			<CustomText font={theme.font.inter} size='s' color={theme.color.gray[600]}>
				View your account on <ExternalLink>New Chain</ExternalLink>
			</CustomText>
		</>
	);
};

export const StyledTextInfos = styled.dl`
	& {
		font-family: ${theme.font.inter};
		margin-bottom: 0;
	}

	& dt {
		color: ${theme.color.gray[300]};
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 1.2px;
	}

	& dd {
		color: ${theme.color.gray[600]};
		font-size: 1.2rem;
		font-weight: bold;
		margin-bottom: 1em;
		margin-left: 0;
		margin-top: 0.2em;
	}
`;

const CustomText = styled(Text)`
	@media (min-width: ${theme.breakpoints.tabletL}) {
		text-align: center;
	}
`;

export default WalletModal;
