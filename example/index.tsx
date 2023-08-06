import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';

import './styles.css';

import { ModalProvider, createModal, useModal } from '../src/';

const App = () => {
  return (
    <ModalProvider>
      <Example />
    </ModalProvider>
  );
};

const Example = () => {
  const prettyModal = useModal(PrettyModal);
  const [airplaneMode, setAirplaneMode] = React.useState(false);

  const onOpenModal = React.useCallback(async () => {
    const confirm = await prettyModal.open({ airplaneMode });
    if (confirm) setAirplaneMode(old => !old);
  }, [airplaneMode]);

  return (
    <div>
      Airplane mode is {airplaneMode ? 'ON' : 'OFF'}.
      <br />
      <br />
      <button onClick={onOpenModal}>Toggle airplane mode</button>
    </div>
  );
};
interface PrettyModalProps {
  airplaneMode: boolean;
}
const PrettyModal = createModal<boolean, PrettyModalProps>(
  (close, { airplaneMode }) => {
    return (
      <div className="modal-backdrop">
        <div className={'modal-wrapper'}>
          <p>Confirm to switch {airplaneMode ? 'OFF' : 'ON'} airplane mode.</p>
          <div className="modal-actions">
            <button className="light" onClick={() => close(false)}>
              CANCEL
            </button>
            <button onClick={() => close(true)}>
              SWITCH {airplaneMode ? 'OFF' : 'ON'}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ReactDOM.render(<App />, document.getElementById('root'));
