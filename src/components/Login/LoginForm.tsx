import React, { useState } from "react"
import axios, { AxiosError } from 'axios'

import { useAuthContext } from "../../hooks/useAuth"
import { api } from "../../services/api"

export function LoginForm() {
    const { login } = useAuthContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    async function handleLogin(event: React.FormEvent) {
        event.preventDefault()

        try {
          const response = await api.post('/auth/login', {
            email,
            password,
          })

          const JWT = response.data.data
          login(JWT)
        } catch (err: any | AxiosError) {
          if (axios.isAxiosError(err)) {
            console.log(err.message)
          } else {
            console.log(err)
          }
        }
    }

    return (
        <form className="flex flex-col">
                <input 
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[421px] mb-8 px-4 py-[22px] text-[#49454F] text-2xl leading-6 placeholder:text-[#49454F] border border-black border-opacity-60 rounded"
                />

                <input 
                  type="password"
                  placeholder="Senha"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[421px] mb-5 px-4 py-[22px] text-[#49454F] text-2xl leading-6 placeholder:text-[#49454F] border border-black border-opacity-60 rounded"
                />

                <a 
                  href="/"
                  className="max-w-[156px] text-[#29AAD7] text-[18px] font-light leading-[21px] underline mb-[34px]"
                >
                  Esqueceu a Senha?
                </a>

                <button 
                  type="button"
                  className="w-[336px] mx-auto py-[18px] text-center font-medium text-2xl leading-5 bg-[#F93633] rounded-[100px]"
                  onClick={(event) => handleLogin(event)}
                >
                    Login
                </button>
        </form>

        
    )
}