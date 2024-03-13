type DatePickerProps = {
  chosenDate: Date;
  handleDateSelect: (date: Date) => void;
};

const dayOfWeek = ["Søn", "Man", "Tirs", "Ons", "Tor", "Fre", "Lør"];

export default function DatePicker({
  chosenDate,
  handleDateSelect,
}: DatePickerProps) {
  const today = new Date();
  const dates = [
    today,
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
    // new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    // new Date(today.getFullYear(), today.getMonth(), today.getDate() + 6),
  ];
  return (
    <>
      <div className="flex justify-center gap-1 mt-6 align-middle">
        {dates.map((date, index) => (
          <DateButton
            key={index}
            date={date}
            isSelected={
              date.getFullYear() == chosenDate.getFullYear() &&
              date.getMonth() == chosenDate.getMonth() &&
              date.getDate() == chosenDate.getDate()
            }
            handleDateSelect={handleDateSelect}
          />
        ))}
      </div>
      {/* <p className="text-sm text-center">
        * Der kan maks reserveres {dates.length - 1} dage frem
      </p> */}
    </>
  );
}

const DateButton = ({
  date,
  handleDateSelect,
  isSelected,
}: {
  date: Date;
  handleDateSelect: (date: Date) => void;
  isSelected?: boolean;
}) => {
  return (
    <button
      className={`w-16 p-2 text-center border-2 border-black rounded ${
        isSelected ? "bg-gray-900 text-white" : ""
      }`}
      onClick={() => handleDateSelect(date)}
    >
      <p>{dayOfWeek[date.getDay()]}.</p>
      <p>{date.getDate()}.</p>
    </button>
  );
};
