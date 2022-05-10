import { useState } from "react"

import { LoginButton } from "./LoginButton"
import mobiufal from '../../assets/mobiufal-logo.svg'

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className="max-w-[463px] bg-white mx-auto pt-[69px] pl-[18px] pb-[34px] pr-[24px] flex relative">
            <img 
              src={mobiufal}
              alt="Mobiufal Logo" 
              className="absolute top-[-174px] left-1/2 -translate-x-1/2"
            />

            <form className="flex flex-col">
                <input 
                  type="email"
                  placeholder="Email"
                  className="w-[421px] mb-8 px-4 py-[22px] text-[#49454F] text-2xl leading-6 placeholder:text-[#49454F] border border-black border-opacity-60 rounded"
                />

                <input 
                  type="password"
                  placeholder="Senha"
                  className="w-[421px] mb-5 px-4 py-[22px] text-[#49454F] text-2xl leading-6 placeholder:text-[#49454F] border border-black border-opacity-60 rounded"
                />

                <a 
                  href="/"
                  className="max-w-[156px] text-[#29AAD7] text-[18px] font-light leading-[21px] underline mb-[34px]"
                >
                  Esqueceu a Senha?
                </a>

            <LoginButton email={email} password={password} />
                
            </form>
        </div>
    )
}