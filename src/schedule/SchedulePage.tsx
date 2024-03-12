import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import { CinemaType } from "../types";

export default function SchedulePage() {
  // Get movie id from URL
  const { id } = useParams();
  //   const [movie, setMovie] = useState<MovieType>(null);
  const [cinemas, setCinemas] = useState<CinemaType[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<CinemaType | null>(null);
  const [selectedScheduleDate, setSelectedScheduleDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);

  const handleCinemaSelect = (cinema: CinemaType) => {
    setSelectedCinema(cinema);
  };

  const handleDateSelect = (date: Date) => {
    console.log(date);

    setSelectedScheduleDate(date);
  };

  // TODO:
  // Fetch movie data
  // Fetch schedule data based on selected cinema and date and movie id

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

    fetch(`http://localhost:8080/schedules/${formattedDate}`)
      .then(res => res.json())
      .then(data => setSchedules(data));
  }, [selectedCinema, selectedScheduleDate, id]);

  return (
    <>
      {/* Movie data component use id to fetch  */}
      {/* Time selector component -> click event should pass the schedule id along and show seats available */}
      <div className="flex flex-row justify-center gap-2 mx-auto mt-10">
        {/* <div className="flex-wrap justify-center"> */}
        <img
          className="w-[200px] rounded-xl"
          src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRTP-j51D5LbT3V_xXtI7L639TWsN2KABuVeSyMRqZZDzoccDE"
        />
        <div className="mx-6 ">
          <h1 className="text-xl font-bold">Kong FU Panda</h1>
          <p className="text-sm">95 minutter</p>
        </div>
      </div>
      <div className="max-w-[500px] mx-auto mt-6 flex flex-col justify-center">
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
        <TimePicker schedules={schedules} />
      </div>
    </>
  );
}
