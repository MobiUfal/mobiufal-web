interface ButtonProps {
  onClickValue(): void;
}

export const FilterButton = ({ onClickValue }: ButtonProps) => {
  return (
    <>
      <button
        onClick={onClickValue}
        type="button"
        className="flex justify-center w-full bg-[#29AAD7] hover:bg-sky-600 text-white px-[10px] py-[10px] font-bold text-[14px] rounded-full"
      >
        Filtrar
      </button>
    </>
  );
};
