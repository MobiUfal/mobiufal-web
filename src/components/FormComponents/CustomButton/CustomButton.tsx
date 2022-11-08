import { FormEvent, useEffect, useState } from "react";
import { Spinner } from "../../Spinner";

interface CustomButtonProps {
  functionOnClick: (event?: FormEvent) => void;
  aditionalStyleClasses?: string;
  text: string;
  isLoading: boolean;
}

export function CustomButton({
  functionOnClick,
  aditionalStyleClasses,
  text,
  isLoading,
}: CustomButtonProps) {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (isLoading === true) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [isLoading]);

  return (
    <button
      className={
        `w-80 rounded-[100px] text-center py-2 transition-all hover:brightness-90 ` +
        aditionalStyleClasses +
        `${isLoading === true ? " brightness-90" : ""}`
      }
      onClick={functionOnClick}
      disabled={disabled}
    >
      {isLoading === true ? <Spinner customColor="#000000" /> : text}
    </button>
  );
}
