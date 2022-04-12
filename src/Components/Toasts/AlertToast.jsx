import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Toast.css'

export const AlertToast = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
