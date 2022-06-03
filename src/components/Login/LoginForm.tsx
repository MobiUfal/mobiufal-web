import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios, { AxiosError } from 'axios'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import getValidationErrors from '../../utils/getValidationErrors'
import { useAuthContext } from "../../hooks/useAuth"
import { api } from "../../services/api"

export default function LoginForm() {
    const { login } = useAuthContext()

    const [email, setEmail] = useState('')
    const [emailValidation, setEmailValidation] = useState('')
    
    const [password, setPassword] = useState('')
    const [passwordValidation, setPasswordValidation] = useState('')

    const navigate = useNavigate()
    
    async function handleLogin(event: React.FormEvent) {
        event.preventDefault()

        try {
          setEmailValidation('')
          setPasswordValidation('')

          const schema = Yup.object().shape({
            email: Yup.string()
              .email('Digite um email válido')
              .required('E-mail obrigatório'),
            password: Yup.string().required('Senha obrigatória'),
          });

          const data = {
            email,
            password
          }

          await schema.validate(data, {
            abortEarly: false,
          });

          const response = await api.post('/auth/login', {
            email,
            password,
          })

          const JWT = response.data.data
          login(JWT)

          toast.success('login realizado com sucesso. Você será redirecionado para a página principal', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500
          });

          navigate('/deslocamentos')
        } catch (err: any | AxiosError | Yup.ValidationError) {
          if (axios.isAxiosError(err)) {
            console.log(err.message)
          } else {
            console.log(err)
            
            if (err instanceof Yup.ValidationError) {
              const errorsFromYup = getValidationErrors(err);
              
              toast.error('Erro ao realizar login, por favor tente novamente.', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500
              });
              
              Object.entries(errorsFromYup).forEach(([key, value]: any) => {      
                if(key === 'email') {
                  setEmailValidation(value);
                } else if(key === 'password') {
                  setPasswordValidation(value);
                }
               });
              
              return;
            }

          }
        }
    }

    return (
        <form className="flex flex-col">
                {emailValidation && <label className="text-[#F93633]">* {emailValidation}</label>}
                <input 
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[421px] mb-8 px-4 py-[22px] text-[#49454F] text-2xl leading-6 placeholder:text-[#49454F] border border-black border-opacity-60 rounded"
                />

                {passwordValidation && <label className="text-[#F93633]">* {passwordValidation}</label>}
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