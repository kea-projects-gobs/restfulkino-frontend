import  { useState, useEffect } from 'react';
// import { fetch } from ...

type Ticket = {
  id: number;
  seatId: number;
  price: number;
  reservationId: number;
};

type ReservationDetails = {
  id: number;
  scheduleId: number;
  tickets: Ticket[];
  reservationDate: string;
  feeOrDiscount: number;
};
// Future implementation - use this prop instead of the useEffect (pass it down to the component)
// type BookingPriceProps = {
//     reservationDetails: ReservationDetails;
// }

const BookingPrice = () => {
  const [reservationDetails, setReservationDetails] = useState<ReservationDetails | null>(null);


  useEffect(() => {
    // Simulate fetching reservation details with dummy data
    const dummyData: ReservationDetails = {
      id: 0,
      scheduleId: 1,
      tickets: [
        {
          id: 0,
          seatId: 37,
          price: 80.0,
          reservationId: 0
        },
        {
          id: 0,
          seatId: 43,
          price: 80.0,
          reservationId: 0
        },
        {
          id: 0,
          seatId: 32,
          price: 80.0,
          reservationId: 0
        }
      ],
      reservationDate: "2024-03-20",
      feeOrDiscount: 16.8
    };

    setReservationDetails(dummyData);
  }, []);

  // Calculate total price of tickets
  const ticketsTotal = reservationDetails?.tickets.reduce((acc, ticket) => acc + ticket.price, 0) ?? 0;

  // Calculate total (including fee/discount)
  const finalTotal = ticketsTotal + (reservationDetails?.feeOrDiscount ?? 0);

  if (!reservationDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-4 w-1/3">
      <h2 className="text-lg font-semibold mb-4">Dit køb</h2>
      {reservationDetails.tickets.map((ticket) => (
        <div key={ticket.seatId} className="flex justify-between">
          <span>Seat {ticket.seatId}</span>
          <span>{ticket.price.toFixed(2)} kr</span>
        </div>
      ))}
      <hr className="my-2" />
      <div className="my-4">
        <div className="flex justify-between">
            {reservationDetails.feeOrDiscount > 0 ? "Gebyr" : "Rabat"}
          <span>{reservationDetails.feeOrDiscount.toFixed(2)} kr</span>
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>{finalTotal.toFixed(2)} kr</span>
      </div>
    </div>
  );
};

export default BookingPrice;