// import { useState } from "react";
import Seat from "./Seat";

type SeatGridProps = {
  rows: number;
  columns: number;
  handleSeatSelect: (seatIndex: number) => void;
  selectedSeats: number[];
  occupiedSeats: number[];
};

export default function SeatGrid({
  rows,
  columns,
  handleSeatSelect,
  selectedSeats,
  occupiedSeats,
}: SeatGridProps) {
  //   const handleSeatSelect = (seatIndex: number) => {
  //     console.log("Seat selected:", getSeatName(seatIndex));

  //     setSelectedSeats(prevSelectedSeats => {
  //       if (prevSelectedSeats.includes(seatIndex)) {
  //         return prevSelectedSeats.filter(seat => seat !== seatIndex);
  //       } else {
  //         return [...prevSelectedSeats, seatIndex];
  //       }
  //     });
  //   };

  // Function to extract seat name from index
  //   const getSeatName = (index: number): string => {
  //     const row = Math.floor(index / columns) + 1;
  //     const column = (index % columns) + 1;
  //     return `${String.fromCharCode(64 + row)}${column}`;
  //   };

  const totalSeats = rows * columns;
  const rowLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(0, rows).split("");

  return (
    <div className="flex flex-row max-w-[400px] mx-auto content-center">
      <div className="flex flex-col w-6">
        {rowLetters.map(letter => (
          <span key={letter}>{letter}</span>
        ))}
      </div>
      <div
        className={`grid grid-cols-${columns} gap-2 max-w-[350px] content-center`}
      >
        {[...Array(totalSeats).keys()].map(index => (
          <Seat
            key={index}
            selected={selectedSeats.includes(index)}
            occupied={occupiedSeats.includes(index)}
            onSelect={() => handleSeatSelect(index)}
          />
        ))}
      </div>
    </div>
  );
}
