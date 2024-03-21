import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function BookingConfirmation() {
  const reservationDetails = useLocation().state;
  console.log(reservationDetails);

  return (
    <>
      {reservationDetails === null ? (
        <div className="flex flex-col justify-center min-h-[400px] bg-gray-100 gap-6 items-center">
          <h1 className="mt-6 text-4xl text-center">Siden kan ikke vises</h1>
          <button className="h-10 p-2 w-[200px] text-white bg-blue-700 rounded hover:bg-blue-800">
            <Link to={"/"}>Gå tilbage til forsiden</Link>
          </button>
        </div>
      ) : (
        <div className="flex justify-center min-h-[400px] p-4 bg-gray-100">
          <div className="flex flex-col">
            <>
              <h1 className="text-4xl">Tak for din reservation!</h1>
              <p className="mt-4 text-lg">
                Du har reserveret billetter til{" "}
                <span className="font-bold">
                  {reservationDetails.schedule.movieTitle}
                </span>
              </p>
              <div className="mx-auto mt-2">
                {/* <p className="text-xl">{reservationDetails.schedule.movieTitle}</p> */}
                <p className="text-xl font-bold">
                  {reservationDetails.schedule.cinemaName} -{" "}
                  {reservationDetails.schedule.hallName}
                </p>
                <p className="text-xl">
                  {reservationDetails.schedule.date} -{" "}
                  {reservationDetails.schedule.startTime.substring(0, 5)}
                </p>
              </div>
              <div className="pt-4">
                <h2 className="pb-2 text-xl font-bold text-center">Sæder</h2>
                <div className="flex flex-wrap justify-center gap-1 max-w-[250px] mx-auto">
                  {reservationDetails.seatDetails.map((seat: string[]) => (
                    <span
                      //   key={seat}
                      className="w-10 p-1 text-center text-white bg-gray-900 rounded"
                    >
                      {" "}
                      {seat}{" "}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button className="h-10 p-2 w-[200px] text-white bg-blue-700 rounded hover:bg-blue-800 mt-6">
                    <Link to={"/"}>Gå tilbage til forsiden</Link>
                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
}
