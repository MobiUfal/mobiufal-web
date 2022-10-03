import { InputHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  aditionalStyleClasses?: string;
  onChangeText(value: string): void;
}

export const CustomInput = ({placeholder, label, aditionalStyleClasses, ...rest}: CustomInputProps) => {
  let bgColor = 'bg-[#FFFCF9]';
  const { disabled } = rest;

  if (disabled !== undefined && disabled === true) {
    bgColor = 'bg-[#000000]/5'; // gray
  }

  return (
    <div className="mt-1 mr-[7px] relative w-full min-w-[184px]">
      { label && 
        <label htmlFor={rest.id} className="block mb-2 text-sm font-medium text-black">
          {label}
        </label>
      }
      <input
        type="text"
        className={`w-full px-3 py-2 text-left text-black ${bgColor} shadow-sm border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm ` + aditionalStyleClasses}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  )
}