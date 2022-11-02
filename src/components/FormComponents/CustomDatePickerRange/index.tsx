import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";



interface CustomDatePickerRangeProps {
  startDate: Date | null;
  endDate: Date | null;
  onChangeDate: (range: [Date | null, Date | null])=> void;
}


export const CustomDatePickerRange = ({onChangeDate, startDate, endDate}: CustomDatePickerRangeProps) => {
  return (
    <div className="mt-1 mr-[7px] w-full min-w-[184px]">
      <DatePicker
        className={"w-full px-3 py-2 text-left text-black shadow-sm bg-[#FFFCF9] border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update: [Date | null, Date | null]) => onChangeDate(update)}
        isClearable={true}
        dateFormat="dd/MM/yyyy"
        placeholderText="Data inicial - Data final"
      />
    </div>
  );
};