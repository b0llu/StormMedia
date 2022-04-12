import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export const SuccessToast = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};