import * as React from 'react';

export interface ModalContextValue<P, C> {
  open: (
    modalKey: string,
    modalName: React.FunctionComponent<P>,
    promiseResolver: (value: C) => void,
    props: P
  ) => void;
  close: (modalKey: string, resolverValue: C) => void;
}

export const ModalContext = React.createContext<ModalContextValue<any, any>>({
  open: () => () => null,
  close: () => null,
});
