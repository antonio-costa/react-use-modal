import React, { useMemo } from 'react';
import { ModalContext } from './ModalContext';

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [renderedModals, setRenderedModals] = React.useState<
    Record<
      string,
      {
        component: React.FunctionComponent<any>;
        promiseResolver: (value: any) => void;
        props: any;
      }
    >
  >({});

  const open = React.useCallback(
    async <P extends any>(
      modalKey: string,
      component: React.FunctionComponent<P>,
      promiseResolver: (value: any) => void,
      props?: P
    ) => {
      setRenderedModals(old => ({
        ...old,
        [modalKey]: { component, promiseResolver, props },
      }));
    },
    []
  );

  const close = React.useCallback(<C,>(modalKey: string, resolverValue: C) => {
    setRenderedModals(old => {
      if (old[modalKey]) {
        old[modalKey].promiseResolver(resolverValue);
        delete old[modalKey];
        return { ...old };
      }
      return old;
    });
  }, []);

  const contextValue = useMemo(() => ({ open, close }), [close, open]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {Object.entries(renderedModals).map(
        ([modalKey, { component: ModalComponent, props }]) => (
          <ModalComponent key={modalKey} {...props} />
        )
      )}
    </ModalContext.Provider>
  );
};
