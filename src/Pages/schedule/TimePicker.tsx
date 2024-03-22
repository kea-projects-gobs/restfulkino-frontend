import { ScheduleType } from "../../types/types";

type TimePickerProps = {
  handleTimeSelect: (schedule: ScheduleType) => void;
  schedules: ScheduleType[];
  selectedTime: ScheduleType | null;
};

export default function TimePicker({
  schedules,
  handleTimeSelect,
  selectedTime,
}: TimePickerProps) {
  return (
    <>
      <div className="grid w-full grid-cols-3 gap-2">
        {schedules.length > 0 &&
          schedules.map((schedule: ScheduleType) => (
            <TimeButton
              key={schedule.id}
              // time={schedule.startTime.substring(0, 5)}
              schedule={schedule}
              handleTimeSelect={handleTimeSelect}
              isSelected={selectedTime?.id === schedule.id}
            />
          ))}
      </div>
    </>
  );
}

function TimeButton({
  schedule,
  handleTimeSelect,
  isSelected,
}: {
  schedule: ScheduleType;
  handleTimeSelect: (schedule: ScheduleType) => void;
  isSelected: boolean;
}) {
  const validateTimeDate = (date: string, time: string): boolean => {
    const now: Date = new Date();
    console.log("now", now);

    const [year, month, day] = date.split("-").map(Number);
    const [hour, minute] = time.split(":").map(Number);

    const currentDate = new Date(year, month - 1, day, hour, minute);

    return now < currentDate;
  };

  const className = `p-2 text-white rounded ${
    isSelected ? "bg-gray-900" : "bg-gray-500"
  } ${
    validateTimeDate(schedule.date, schedule.startTime.substring(0, 5))
      ? ""
      : "cursor-not-allowed line-through	"
  }`;

  const handleTimeSelectWithValidation = (schedule: ScheduleType) => {
    if (validateTimeDate(schedule.date, schedule.startTime.substring(0, 5))) {
      handleTimeSelect(schedule);
    }
  };

  return (
    <button
      className={className}
      onClick={() => handleTimeSelectWithValidation(schedule)}
    >
      {schedule.startTime.substring(0, 5)}
    </button>
  );
}
