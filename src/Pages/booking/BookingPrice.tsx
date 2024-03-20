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

type BookingPriceProps = {
    reservationDetails: ReservationDetails;
    getSeatDisplayName: (seatIndex: number) => string;
 }

const BookingPrice: React.FC<BookingPriceProps> = ( {reservationDetails, getSeatDisplayName}) => {
 
  // Calculate total price of tickets
  const ticketsTotal = reservationDetails?.tickets.reduce((acc, ticket) => acc + ticket.price, 0) ?? 0;

  // Calculate total (including fee/discount)
  const finalTotal = ticketsTotal + (reservationDetails?.feeOrDiscount ?? 0);



  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Dit køb</h2>
      {reservationDetails?.tickets.length > 0 ? (
        <>
          {reservationDetails.tickets.map((ticket) => (
            <div key={ticket.seatId} className="flex justify-between">
              <span>Sæde {getSeatDisplayName(ticket.seatId)}</span>
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
        </>
      ) : (
        <p>Ingen sæder valgt</p>
      )}
    </div>
  );
};

export default BookingPrice;