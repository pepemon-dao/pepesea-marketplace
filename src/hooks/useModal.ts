import { useCallback, useContext, ReactNode } from 'react';
import { ModalsProviderContext } from '../contexts';

const useModal = (modalData?: ReactNode, key?: string) => {
  const { onPresent, onDismiss } = useContext(ModalsProviderContext);

  const handlePresent = useCallback(() => {
    onPresent(modalData, key);
  }, [key, modalData, onPresent]);

  return [handlePresent, onDismiss];
};

export default useModal;
