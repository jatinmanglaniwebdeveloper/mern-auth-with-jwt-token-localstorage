// Notifications.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function displayNotification(message) {
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}
