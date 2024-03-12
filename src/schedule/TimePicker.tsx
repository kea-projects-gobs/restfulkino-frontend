import { ScheduleType } from "../types";

type TimePickerProps = {
  //   handleTimeSelect: (time: string) => void;
  schedules: ScheduleType[];
};

export default function TimePicker({ schedules }: TimePickerProps) {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 mt-6">
        {schedules.length > 0 &&
          schedules.map((schedule: ScheduleType) => (
            <TimeButton
              key={schedule.id}
              time={schedule.startTime.substring(0, 5)}
              handleTimeSelect={time => console.log(time)}
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
}: {
  time: string;
  handleTimeSelect: (time: string) => void;
}) {
  return (
    <button
      className="p-2 text-white bg-gray-500 rounded"
      onClick={() => handleTimeSelect(time)}
    >
      {time}
    </button>
  );
}
