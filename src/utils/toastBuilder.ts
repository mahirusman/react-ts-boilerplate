import React from 'react';
import { toast } from 'react-toastify';

type tosstypes = 'success' | 'info' | 'warn' | 'error';

const toastBuilder = (type: tosstypes, message: string): React.ReactText => {
  switch (type) {
    case 'success':
      return toast.success(message);
    case 'info':
      return toast.info(message);

    case 'warn':
      return toast.warn(message);

    case 'error':
      return toast.error(message);

    default:
      return toast(message);
  }
};

export default toastBuilder;
