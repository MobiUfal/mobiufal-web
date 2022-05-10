import React from "react"

interface LoginButtonProps {
    email: string
    password: string
}

export function LoginButton({ email, password }: LoginButtonProps) {
    async function handleLogin(event: React.FormEvent) {
        event.preventDefault()
        
        // check username and password using await
    }

    return (
        <button 
          type="button"
          
          className="w-[336px] mx-auto py-[18px] text-center font-medium text-2xl leading-5 bg-[#F93633] rounded-[100px]"
          onClick={(event) => handleLogin(event)}
        >
            Login
        </button>
    )
}