import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import { CinemaType, MovieType, ScheduleType } from "../types";
import MovieDescription from "./MovieDescription";

export default function SchedulePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieType>();
  const [cinemas, setCinemas] = useState<CinemaType[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<CinemaType | null>(null);
  const [selectedScheduleDate, setSelectedScheduleDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [selectedTime, setSelectedTime] = useState<ScheduleType | null>(null);

  const handleCinemaSelect = (cinema: CinemaType) => {
    setSelectedCinema(cinema);
    setSelectedTime(null);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedScheduleDate(date);
  };

  const handleTimeSelect = (time: ScheduleType) => {
    console.log("Selected time: ", time);
    setSelectedTime(time);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/movies/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:8080/api/cinemas")
      .then(res => res.json())
      .then(data => setCinemas(data));
  }, []);

  useEffect(() => {
    // Refractor date formatter
    const year = selectedScheduleDate.getFullYear();
    const month = String(selectedScheduleDate.getMonth() + 1).padStart(2, "0"); // Month starts from 0
    const day = String(selectedScheduleDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    if (selectedCinema != null) {
      fetch(
        `http://localhost:8080/api/schedules/${formattedDate}/movies/${id}/cinemas/${selectedCinema?.id}`
      )
        .then(res => res.json())
        .then(data => setSchedules(data));
    }
  }, [selectedCinema, selectedScheduleDate, id]);

  return (
    <>
      {movie?.title && <MovieDescription movie={movie} />}
      <div className="max-w-[600px] mx-auto mt-2 flex flex-col justify-center bg-gray-100 p-10 rounded">
        <div className="mx-auto">
          <DropDownMenu
            cinemas={cinemas}
            handleCinemaSelect={handleCinemaSelect}
          />
        </div>
        <DatePicker
          handleDateSelect={handleDateSelect}
          chosenDate={selectedScheduleDate}
        />
        <div className="w-[336px] mx-auto">
          <TimePicker
            schedules={schedules}
            handleTimeSelect={handleTimeSelect}
            selectedTime={selectedTime}
          />
        </div>
        <div className="flex justify-center mt-4">
          {selectedTime && (
            <button className="h-10 w-[336px] p-2 text-white bg-blue-700 rounded hover:bg-blue-800">
              Vælg sæde(r)
            </button>
          )}
        </div>
      </div>
    </>
  );
}
