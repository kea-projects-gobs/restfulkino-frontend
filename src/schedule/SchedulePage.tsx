import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import { CinemaType, MovieType, ScheduleType } from "../types";
import MovieDescription from "./MovieDescription";
import {
  getCinemas,
  getMoviesById,
  getSchedulesByDateAndMovieIdAndCinemaId,
} from "../services/api";

export default function SchedulePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieType>();
  const [cinemas, setCinemas] = useState<CinemaType[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<CinemaType | null>(null);
  const [selectedScheduleDate, setSelectedScheduleDate] = useState(new Date());
  const [schedules2d, setSchedules2d] = useState([]);
  const [schedules3d, setSchedules3d] = useState([]);
  const [selectedTime, setSelectedTime] = useState<ScheduleType | null>(null);

  const handleCinemaSelect = (cinema: CinemaType) => {
    setSelectedCinema(cinema);
    setSelectedTime(null);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedScheduleDate(date);
  };

  const handleTimeSelect = (time: ScheduleType) => {
    console.log(time);

    setSelectedTime(time);
  };

  useEffect(() => {
    getMoviesById(Number(id)).then(data => setMovie(data));
  }, [id]);

  useEffect(() => {
    getCinemas().then(data => setCinemas(data));
  }, []);

  useEffect(() => {
    // Refractor date formatter
    const year = selectedScheduleDate.getFullYear();
    const month = String(selectedScheduleDate.getMonth() + 1).padStart(2, "0"); // Month starts from 0
    const day = String(selectedScheduleDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    if (selectedCinema != null) {
      getSchedulesByDateAndMovieIdAndCinemaId(
        formattedDate,
        Number(id),
        selectedCinema.id
      ).then(data => {
        setSchedules3d(data.filter((schedule: ScheduleType) => schedule.is3d));
        setSchedules2d(data.filter((schedule: ScheduleType) => !schedule.is3d));
        return;
      });
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
        {schedules2d.length > 0 && (
          <div className="w-[336px] mx-auto mt-6">
            <TimePicker
              schedules={schedules2d}
              handleTimeSelect={handleTimeSelect}
              selectedTime={selectedTime}
            />
          </div>
        )}
        {schedules3d.length > 0 && (
          <div className="w-[336px] mx-auto mt-6">
            <p className="pb-1 font-bold">3d</p>
            <TimePicker
              schedules={schedules3d}
              handleTimeSelect={handleTimeSelect}
              selectedTime={selectedTime}
            />
          </div>
        )}
        {schedules2d.length === 0 && schedules3d.length === 0 && (
          <p className="mt-6 text-center">Ingen ledige tider</p>
        )}
        <div className="flex justify-center mt-6">
          {selectedTime && (
            <button
              onClick={() => navigate(`/schedules/${selectedTime.id}/booking`)}
              className="h-10 w-[336px] p-2 text-white bg-blue-700 rounded hover:bg-blue-800"
            >
              Vælg sæde(r)
            </button>
          )}
        </div>
      </div>
    </>
  );
}
