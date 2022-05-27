import mobiufal from '../../assets/mobiufal-logo.svg'
import LoginForm from "./LoginForm"
import { ToastContainer } from 'react-toastify';

export function Login() {
    return (
        <div className="max-w-[463px] bg-white mx-auto pt-[69px] pl-[18px] pb-[34px] pr-[24px] flex relative">
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
              className="absolute top-[-174px] left-1/2 -translate-x-1/2"
            />

            <LoginForm />
        </div>
    )
}