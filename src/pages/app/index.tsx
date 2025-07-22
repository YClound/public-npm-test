import { useState } from 'react';
import { Button, Modal, Toast } from '../../index'

const App = () => {

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    console.log('Clicked OK');
    setVisible(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel');
    setVisible(false);
  }
  
  const showSuccessToast = () => {
    Toast.success('操作成功！', { duration: 3000 });
  };
  
  const showErrorToast = () => {
    Toast.error('操作失败，请重试', { position: 'bottom-right' });
  };

  return <div>
    <Button variant="secondary">次要按钮</Button>
    <Button variant="success">成功按钮</Button>

    <Button onClick={showModal}>Open Modal</Button>
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={handleOk}
      onClose={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>

    <Button onClick={showSuccessToast}>Show Success</Button>
    <Button onClick={showErrorToast}>Show Error</Button>
  </div>
}

export default App;