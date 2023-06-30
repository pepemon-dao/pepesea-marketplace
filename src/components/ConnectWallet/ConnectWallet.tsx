import React, { useState } from 'react';
import { theme } from '../../theme';
import { ConnectWallet } from '@thirdweb-dev/react';

const WalletConnect: React.FC<any> = () => {
	const [isHover, setIsHover] = useState(false);

	const handleMouseEnter = () => {
		setIsHover(true);
	};

	const handleMouseLeave = () => {
		setIsHover(false);
	};

	return (
		<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<ConnectWallet
				style={{
					borderWidth: '1px',
					borderStyle: 'solid',
					borderRadius: '8px',
					cursor: 'pointer',
					fontFamily: theme.font.spaceMace,
					fontSize: 'clamp(.9rem, 2vw, 1rem)',
					fontWeight: 'bold',
					textAlign: 'center',
					textTransform: 'uppercase',
					padding: '.75em 1.5em',
					position: 'relative',
					transition: 'all .4s',
					backgroundImage: !isHover
						? `linear-gradient(to bottom, ${theme.color.green[100]}, ${theme.color.green[200]})`
						: `linear-gradient(to bottom, #aa6cd6 -100%, ${theme.color.purple[600]})`,
					borderColor: 'transparent',
					color: !isHover ? theme.color.purple[800] : theme.color.white,
					boxShadow: `0 4px 10px 0 ${theme.color.colorsLayoutShadows}`,
				}}
			/>
		</div>
	);
};

export default WalletConnect;
