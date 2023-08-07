# React useModal

React useModal is a package that implements a simple way to show/hide modals in your project, while also requiring minimal boilerplate (you only need to inject the ModalProvider at the root of your application). Has zero dependencies and minimal bundle size.

This package's API is heavily inspired on the existing package https://github.com/eBay/nice-modal-react , however the implementation is not.

## Implementation

Wrap your app in the `<ModalProvider/>` component:

```tsx
// your app root file

const App = () => {
  return <ModalProvider>{/* children */}</ModalProvider>;
};
```

Create a modal component with the `createModal()` HOC, adding optionally some props:

**Please note:** _react-use-modal is completely style free, you need to create your own Modal components. This implementation also supports, but does not implement, portals._

```tsx
interface PrettyModalProps {
  customText: string;
}
const PrettyModal = createModal<boolean, PrettyModalProps>(
  (close, { customText }) => {
    return (
      <div
        style={{
          positon: 'absolute',
          inset: '0px 0px 0px 0px',
          backgroundColor: 'rgba(0,0,0,0.2)',
          display: 'flex',
          justifyContents: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ backgroundColor: 'white', padding: 48 }}>
          <p>{customText}</p>
          <button type="button" onClick={() => close(false)}>
            Don't show alert
          </button>
          <br />
          <button type="button" onClick={() => close(true)}>
            Show alert
          </button>
        </div>
      </div>
    );
  }
);
```

Anywhere inside your application, call `open()` function from `useModal()` hook:

```tsx
const Example = () => {
  const prettyModal = useModal(PrettyModal);

  const onOpenModal = React.useCallback(async () => {
    const showAlert = await prettyModal.open({ customText: 'Hello world!' });
    if (showAlert) alert('It works!');
  }, [prettyModal]);

  return <button onClick={onOpenModal}>Show modal</button>;
};
```
