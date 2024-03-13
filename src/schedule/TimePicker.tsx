import { ScheduleType } from "../types";

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
      <div className="grid w-full grid-cols-3 gap-2 mt-6">
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
      {schedules.length == 0 && (
        <p className="text-center">Ingen ledige tider</p>
      )}
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
  return (
    <button
      className={`p-2 text-white rounded ${
        isSelected ? "bg-gray-900" : "bg-gray-500"
      }`}
      onClick={() => handleTimeSelect(time)}
    >
      {time}
    </button>
  );
}
