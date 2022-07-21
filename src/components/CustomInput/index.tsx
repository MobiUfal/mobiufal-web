
interface CustomInputProps {
  placeholder: string;
}

export const CustomInput = ({placeholder}: CustomInputProps) => {
  return (
    <> 
      <div className="mt-1 mr-[7px] relative w-full min-w-[184px]">
        <input
          type="text"
          className="w-full pl-3 pr-10 py-2 text-left text-black bg-[#FFFCF9] shadow-sm border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm shadow-sm"
          placeholder={placeholder}
        />
      </div>
    </>
  )
}