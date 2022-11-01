import mobiufal from "../../assets/mobiufal-logo.svg";
import LoginForm from "./LoginForm";
import { ToastContainer } from "react-toastify";

export function Login() {
  return (
    <div className="bg-white w-1/2 max-w-[512px] mx-auto pt-[69px] pl-[18px] pb-[34px] pr-[24px] flex relative rounded-md">
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <img
        src={mobiufal}
        alt="Mobiufal Logo"
        className="absolute top-[-70px] left-1/2 -translate-x-1/2 w-20 h-28"
      />

      <LoginForm />
    </div>
  );
}
