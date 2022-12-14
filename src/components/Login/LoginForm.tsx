import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import getValidationErrors from "../../utils/getValidationErrors";
import { useAuthContext } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { CustomButton } from "../FormComponents/CustomButton/CustomButton";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState("");

  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");

  const navigate = useNavigate();

  async function handleLogin(event: React.FormEvent | undefined) {
    event?.preventDefault();
    setIsLoading(true);

    try {
      setEmailValidation("");
      setPasswordValidation("");

      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Digite um email válido")
          .required("E-mail obrigatório"),
        password: Yup.string().required("Senha obrigatória"),
      });

      const data = {
        email,
        password,
      };

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.post("/auth/login", {
        email,
        password,
      });
      
      if(!response.data.success) {
        throw new Error(response.data.message);
      }
      
      toast.success(
        "Login realizado com sucesso. Você será redirecionado para a página principal",
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        }
      );
      const JWT = response.data.data.token;
      login(JWT);
      navigate("/deslocamentos");
    } catch (err: any | AxiosError | Yup.ValidationError) {
      if (axios.isAxiosError(err)) {
        const errorMessage =  err?.response?.status === 401 ? 'CPF e/ou senha incorreto(s).' : 'Tente novamente'
        toast.error('Ocorreu um erro ao fazer o login na plataforma, ' + errorMessage, {
          position: 'top-right',
          autoClose: 2500,
        });
      } else {

        if (err instanceof Yup.ValidationError) {
          const errorsFromYup = getValidationErrors(err);
          toast.error("Erro ao realizar login, por favor tente novamente.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2500,
          });

          Object.entries(errorsFromYup).forEach(([key, value]: any) => {
            if (key === "email") {
              setEmailValidation(value);
            } else if (key === "password") {
              setPasswordValidation(value);
            }
          });
          setIsLoading(false);
          return;
        }
      }
      setIsLoading(false);
    }
  }

  return (
    <form className="flex flex-col w-full">
      {emailValidation && (
        <label className="text-[#F93633]">* {emailValidation}</label>
      )}
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-8 px-4 py-[22px] text-[#49454F] text-2xl leading-6 placeholder:text-[#49454F] border border-black border-opacity-60 rounded"
      />

      {passwordValidation && (
        <label className="text-[#F93633]">* {passwordValidation}</label>
      )}
      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-5 px-4 py-[22px] text-[#49454F] text-2xl leading-6 placeholder:text-[#49454F] border border-black border-opacity-60 rounded"
      />

      <a
        href="/"
        className="max-w-[156px] text-[#29AAD7] text-[18px] font-light leading-[21px] underline mb-[34px]"
      >
        Esqueceu a Senha?
      </a>

      <CustomButton
        functionOnClick={(event) => handleLogin(event)}
        text="Login"
        isLoading={isLoading}
        aditionalStyleClasses="font-medium text-2xl leading-5 bg-[#F93633] mx-auto py-[18px]"
      />
    </form>
  );
}
