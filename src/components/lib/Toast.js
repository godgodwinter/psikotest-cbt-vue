import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

const babeng = (title = 'Info !', description = '',timeout=1000) => {
  createToast(
    {
      title,
      description,
    },
    {
    timeout
    },
    {
      type: 'default',
      transition: 'bounce',
      position: 'top-right',
    },
  );
};


const ujian = (title = 'Info !', description = '',timeout=1000) => {
  createToast(
    {
      title,
      description,
    },
    {
    timeout
    },
    {
      type: 'default',
      transition: 'bounce',
      position: 'top-right',
    },
  );
};

const warning = (title = 'Info !', description = '',timeout=1000) => {
  createToast(
    {
      title,
      description,
    },
    {
    timeout
    },
    {
      type: 'warning',
      transition: 'bounce',
      position: 'top-right',
    },
  );
};

const danger = (title = 'Info !', description = '',timeout=1000) => {
  createToast(
    {
      title,
      description,
    },
    {
    timeout
    },
    {
      type: 'danger',
      transition: 'bounce',
      position: 'top-right',
    },
  );
};

const success = (title = 'Info !', description = '',timeout=1000) => {
  createToast(
    {
      title,
      description,
    },
    {
    timeout
    },
    {
      type: 'success',
      transition: 'bounce',
      position: 'top-right',
    },
  );
};

const Toast = {
  babeng,
  warning,
  success,
  danger,
  ujian
};
export default Toast;
