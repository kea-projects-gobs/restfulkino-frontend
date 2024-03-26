import { useEffect, useState } from "react";
import SeatGrid from "./SeatGrid";
import CanvasLogo from "./CanvasLogo";
import BookingLegend from "./BookingLegend";
import { useNavigate, useParams } from "react-router";
import {
  CreateReservationType,
  PriceType,
  ScheduleType,
  TicketPriceType,
} from "../../types/types";
import BookingPrice from "./BookingPrice";
import {
  createReservation,
  getHallByNameAndCinemaName,
  getPrices,
  getReservedSeatsByScheduleId,
  getSchedulesById,
} from "../../services/api/api";
import BookingPriceSkeleton from "./BookingPriceSkeleton";
import SeatGridSkeleton from "./SeatGridSkeleton";
import { FaSpinner } from "react-icons/fa";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<ScheduleType>();
  const [columns, setColumns] = useState<number>(0);
  const [rows, setRows] = useState<number>(0);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [occupiedSeats, setOccupiedSeats] = useState<number[]>([]);
  const [prices, setPrices] = useState<PriceType | null>(null);
  const [loadingPrices, setLoadingPrices] = useState<boolean>(false);
  const [loadingSeats, setLoadingSeats] = useState<boolean>(true);
  const [loadingReservation, setLoadingReservation] = useState<boolean>(false);

  const handleSeatSelect = (seatIndex: number): void => {
    setSelectedSeats(prevSelectedSeats => {
      if (prevSelectedSeats.includes(seatIndex)) {
        return prevSelectedSeats.filter(seat => seat !== seatIndex).sort();
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
    if (selectedSeats.length === 0) {
      setPrices(null);
      return;
    }
    setLoadingPrices(true);

    const controller = new AbortController();
    const signal = controller.signal;

    getPrices(reservation, signal).then(data => {
      if (!signal.aborted) {
        const sorted = data.tickets.sort(
          (a: TicketPriceType, b: TicketPriceType) => a.seatIndex - b.seatIndex
        );
        data.tickets = sorted;
        setPrices(data);
        const timer = setTimeout(() => {
          setLoadingPrices(false);
        }, 400);

        return () => clearTimeout(timer);
        // setLoadingPrices(false);
      } else {
        console.log("Request aborted");
      }
    });
    return () => {
      controller.abort(); // Abort the request when the component unmounts
    };
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
      setLoadingSeats(false);
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
    setLoadingReservation(true);
    createReservation(reservation)
      .then(() => {
        const seatDetails = selectedSeats.map(seatIndex => {
          return getSeatDisplayName(seatIndex);
        });
        navigate("/reservation/confirmation", {
          state: { seatDetails: seatDetails, schedule: schedule },
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-6 mx-auto align-top">
        <div className="flex flex-col justify-start">
          <h1 className="pb-2 text-2xl font-bold text-center">Vælg Sæder</h1>
          <div className="mx-auto">
            <CanvasLogo isLarge={columns > 12} />
          </div>
          {loadingSeats ? (
            <SeatGridSkeleton />
          ) : (
            <SeatGrid
              rows={rows}
              columns={columns}
              handleSeatSelect={handleSeatSelect}
              selectedSeats={selectedSeats}
              occupiedSeats={occupiedSeats}
            />
          )}

          <BookingLegend />
          {/* <div className="pt-4">
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
          </div> */}
          <div className="mx-auto mt-6">
            {!loadingSeats && (
              <button
                className={`h-10 w-[336px] p-2 text-white bg-blue-700 rounded hover:bg-blue-800 ${
                  loadingReservation && "cursor-not-allowed opacity-50"
                }`}
                onClick={handleReservationSubmit}
              >
                {loadingReservation ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="mr-2 animate-spin" />
                    <p>Reserver sæder</p>
                  </span>
                ) : (
                  "Reserver sæder"
                )}
              </button>
            )}
          </div>
        </div>
        <div className="w-[360px]">
          {loadingPrices ? (
            <BookingPriceSkeleton />
          ) : (
            <BookingPrice
              reservationDetails={prices}
              getSeatDisplayName={getSeatDisplayName}
            />
          )}
        </div>
      </div>
    </>
  );
}
