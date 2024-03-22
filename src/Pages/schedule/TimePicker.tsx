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
              time={schedule.startTime.substring(0, 5)}
              handleTimeSelect={() => handleTimeSelect(schedule)}
              isSelected={selectedTime?.id === schedule.id}
            />
          ))}
      </div>
    </>
  );
}

function TimeButton({
  time,
  handleTimeSelect,
  isSelected,
}: {
  time: string;
  handleTimeSelect: (time: string) => void;
  isSelected: boolean;
}) {
  const now: Date = new Date();
  const validateTime = (time: string): boolean => {
    const [hour, minute] = time.split(":").map(Number);
    return (
      now.getHours() < hour ||
      (now.getHours() === hour && now.getMinutes() < minute)
    );
  };

  const className = `p-2 text-white rounded ${
    isSelected ? "bg-gray-900" : "bg-gray-500"
  } ${validateTime(time) ? "" : "cursor-not-allowed line-through	"}`;

  const handleTimeSelectWithValidation = (time: string) => {
    if (validateTime(time)) {
      handleTimeSelect(time);
    }
  };

  return (
    <button
      className={className}
      onClick={() => handleTimeSelectWithValidation(time)}
    >
      {time}
    </button>
  );
}
