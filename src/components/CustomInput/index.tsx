import { InputHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
}

export const CustomInput = ({placeholder, label, ...rest}: CustomInputProps) => {
  return (
    <div className="mt-1 mr-[7px] relative w-full min-w-[184px]">
      { label && 
        <label htmlFor={rest.id} className="block mb-2 text-sm font-medium text-black">
          {label}
        </label>
      }
      <input
        type="text"
        className="w-full px-3 py-2 text-left text-black bg-[#FFFCF9] shadow-sm border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm shadow-sm"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  )
}