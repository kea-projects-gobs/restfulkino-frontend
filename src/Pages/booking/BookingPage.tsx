import { useEffect, useState } from "react";
import SeatGrid from "./SeatGrid";
import CanvasLogo from "./CanvasLogo";
import BookingLegend from "./BookingLegend";
import { useParams } from "react-router";
import { CreateReservationType, PriceType, ScheduleType } from "../../types";
import {
  createReservation,
  getHallByNameAndCinemaName,
  getPrices,
  getReservedSeatsByScheduleId,
  getSchedulesById,
} from "../../services/api";

export default function BookingPage() {
  //TODO: Add state to store selected seats
  const { id } = useParams();
  const [schedule, setSchedule] = useState<ScheduleType>();
  // const [hall, setHall] = useState<Hall>();
  const [columns, setColumns] = useState<number>(0);
  const [rows, setRows] = useState<number>(0);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [occupiedSeats, setOccupiedSeats] = useState<number[]>([
    //   const [occupiedSeats, setOccupiedSeats] = useState<number[]>([
    // 0, 1, 2, 3, 4, 6, 7, 5, 20, 13, 14, 15,
  ]);
  const [prices, setPrices] = useState<PriceType>();

  const handleSeatSelect = (seatIndex: number): void => {
    setSelectedSeats(prevSelectedSeats => {
      if (prevSelectedSeats.includes(seatIndex)) {
        return prevSelectedSeats.filter(seat => seat !== seatIndex);
      } else {
        return [...prevSelectedSeats, seatIndex];
      }
    });
  };

  useEffect(() => {
    const reservation: CreateReservationType = {
      scheduleId: Number(id),
      seatIndexes: selectedSeats,
    };
    getPrices(reservation).then(data => {
      setPrices(data);
      console.log(data);
    });
  }, [selectedSeats, id]);

  useEffect(() => {
    getSchedulesById(Number(id)).then(data => setSchedule(data));
  }, [id]);

  useEffect(() => {
    if (schedule) {
      getHallByNameAndCinemaName(schedule.hallName, schedule.cinemaName).then(
        data => {
          setColumns(data.noOfColumns);
          setRows(data.noOfRows);
        }
      );
    }
  }, [schedule]);

  useEffect(() => {
    getReservedSeatsByScheduleId(Number(id)).then(data => {
      setOccupiedSeats(
        data.map((seat: { seatIndex: number }) => seat.seatIndex)
      );
    });
  }, [id]);

  const getSeatDisplayName = (index: number): string => {
    const row = Math.floor(index / columns) + 1;
    const column = (index % columns) + 1;
    return `${String.fromCharCode(64 + row)}${column}`;
  };

  const handleReservationSubmit = () => {
    const reservation: CreateReservationType = {
      scheduleId: Number(id),
      seatIndexes: selectedSeats,
    };
    console.log(reservation);
    createReservation(reservation).then(data => {
      console.log("Reservation created");
      console.log(data);
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center mx-auto">
        <h1 className="pb-2 text-2xl font-bold text-center">1. Vælg Sæder</h1>
        <div className="mx-auto">
          <CanvasLogo isLarge={columns > 12} />
        </div>
        <SeatGrid
          rows={rows}
          columns={columns}
          handleSeatSelect={handleSeatSelect}
          selectedSeats={selectedSeats}
          occupiedSeats={occupiedSeats}
        />
        <BookingLegend />
        <div className="pt-4">
          <h2 className="text-center">Valgte Sæder</h2>
          <div className="flex flex-wrap justify-center gap-1 max-w-[200px] mx-auto">
            {selectedSeats.map(seat => (
              <span
                key={seat}
                className="w-10 p-1 text-center text-white bg-gray-900 rounded"
              >
                {" "}
                {getSeatDisplayName(seat)}{" "}
              </span>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-6">
          <button
            className="h-10 w-[336px] p-2 text-white bg-blue-700 rounded hover:bg-blue-800"
            onClick={handleReservationSubmit}
          >
            Reserver sæder
          </button>
        </div>
      </div>
    </>
  );
}
