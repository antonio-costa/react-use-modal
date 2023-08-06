import { UseModalClose } from './useModal';

export const createModal = <C extends any = void, P = void>(
  fnc: (close: UseModalClose<C>, props: P) => React.ReactNode
) => {
  return (close: UseModalClose<C>) => (props: P) => fnc(close, props);
};
export type CreateModal = typeof createModal;
