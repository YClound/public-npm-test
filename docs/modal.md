# Modal

## 基本用法

```tsx
import React, { useState } from "react";
import { Modal, Button } from "react-components-library";

export default () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>打开模态框</Button>
      <Modal
        visible={open}
        onOk={handleOpen}
        onClose={handleClose}
        title="标题"
        content="这是模态框的内容"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};
```