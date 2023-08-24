import React, { useState } from 'react';
import { UnhandledError, Modal, ModalTitle, ModalContent, ModalActions, Spacer, Text } from '../../components';
import { theme } from '../../theme';
import {
	ConnectWallet,
	useNetworkMismatch,
	useChain,
	useSwitchChain,
} from '@thirdweb-dev/react';
  

const NotSupportedModal: React.FC<{ page: string }> = ({ page }) => {
	const [unhandledError, setUnhandledError] = useState<{
	  errCode: null | any;
	  errMsg: string;
	}>({ errCode: null, errMsg: '' });

	const isMismatched = useNetworkMismatch();
	const chain = useChain();
	const switchChain = useSwitchChain();
  
	const handleSwitch = async () => {
	  try {
		await switchChain(1);
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
			<ModalTitle text="Switch to Etherum" />
			<ModalContent>
			  <Text
				align="center"
				font={theme.font.inter}
				size="s"
				color={theme.color.gray[600]}
			  >
				{`Your chosen network is currently not supported on the ${page} page.`}
				<br />
				Please change your wallet provider's network to Etherum.
			  </Text>
			</ModalContent>
			<Spacer size="md" />
			<ModalActions
			  modalActions={[
				{
				  text: 'Switch to Etherum',
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
