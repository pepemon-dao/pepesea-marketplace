import React, { useState } from 'react';
import { UnhandledError, Modal, ModalTitle, ModalContent, ModalActions, Spacer, Text } from '../../components';
import { theme } from '../../theme';

  

const NotSupportedModal: React.FC<{ page: string }> = ({ page }) => {
	const [unhandledError, setUnhandledError] = useState<{
	  errCode: null | any;
	  errMsg: string;
	}>({ errCode: null, errMsg: '' });
  
	const handleSwitch = async () => {
	  try {
		const ethereum = (window as any).ethereum;
		if (ethereum && ethereum.request) {
		  await ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: '0x1' }],
		  });
		} else {
		  throw new Error('Invalid wallet provider');
		}
	  } catch (error: any) {
		setUnhandledError({
		  errCode: error.code,
		  errMsg: error.message,
		});
	  }
	};
  
	return (
	  <>
		{unhandledError.errCode ? (
		  <UnhandledError
			errCode={unhandledError.errCode}
			errMsg={unhandledError.errMsg}
			onDismiss={() => setUnhandledError({ errCode: null, errMsg: '' })}
		  />
		) : (
		  <Modal>
			<ModalTitle text="Not (yet) supported" />
			<ModalContent>
			  <Text
				align="center"
				font={theme.font.inter}
				size="s"
				color={theme.color.gray[600]}
			  >
				{`Your chosen network is currently not supported on the ${page} page.`}
				<br />
				Please change your wallet provider's network to ETH.
			  </Text>
			</ModalContent>
			<Spacer size="md" />
			<ModalActions
			  modalActions={[
				{
				  text: 'Switch to ETH',
				  buttonProps: { styling: 'purple', onClick: handleSwitch },
				},
			  ]}
			/>
		  </Modal>
		)}
	  </>
	);
  };
  

export default NotSupportedModal
