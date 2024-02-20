import { Message, useToaster } from 'rsuite';

export default function useCustomToast() {
  const toaster = useToaster();

  const showInfo = (message: string) => {
    toaster.push(renderMessage('info', message), {
      placement: 'bottomCenter',
    });
  };

  const showError = (message: string) => {
    toaster.push(renderMessage('error', message), {
      placement: 'bottomCenter',
    });
  };

  const renderMessage = (type: 'info' | 'error', message: string) => (
    <Message showIcon type={type} closable duration={3000}>
      {message}
    </Message>
  );

  return {
    showInfo,
    showError,
  };
}
