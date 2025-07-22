# Toast

## 基本用法

```tsx
import React, { useState } from "react";
import { Toast, Button } from "react-components-library";

export default () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    Toast.success('成功toast')
  };

  return (
    <div>
      <Button onClick={handleOpen}>显示提示</Button>
    </div>
  );
};
```