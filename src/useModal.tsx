import { useCallback, useContext, useMemo, useRef } from 'react';
import { ModalContext } from './ModalContext';

export type UseModalClose<C> = (resolverValue: C) => void;
export type UseModalOpen<P, C> = (props: P) => Promise<C>;

export const useModal = <P, C>(
  modalComponent: (close: UseModalClose<C>) => (props: P) => React.ReactNode
): { open: UseModalOpen<P, C>; close: UseModalClose<C> } => {
  const modalsContext = useContext(ModalContext);

  // each useModal refers to a specific dialog, we use a random key to identify it
  const modalHookKey = useRef((Math.random() + 1).toString(36).substring(2));

  const close = useCallback<UseModalClose<C>>(
    (resolverValue?: unknown) => {
      modalsContext.close(modalHookKey.current, resolverValue);
    },
    [modalsContext]
  );

  const open = useCallback<UseModalOpen<P, C>>(
    props => {
      return new Promise(resolve => {
        modalsContext.open(
          modalHookKey.current,
          modalComponent(close),
          resolve,
          props
        );
      });
    },
    [close, modalComponent, modalsContext]
  );

  return useMemo(() => ({ open, close }), [close, open]);
};

export type UseModal = typeof useModal;
