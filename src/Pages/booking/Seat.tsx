interface SeatProps {
  selected: boolean;
  occupied: boolean;
  onSelect: () => void;
}

export default function Seat({ selected, occupied, onSelect }: SeatProps) {
  // return (
  //   <div
  //     className={`w-4 h-4 border border-gray-400 ${
  //       selected ? "bg-green-800" : ""
  //     } cursor-pointer`}
  //     onClick={onSelect}
  //   ></div>
  // );
  const handleClick = () => {
    if (!occupied) {
      onSelect();
    }
  };

  let seatColorClass = "";
  if (selected) {
    seatColorClass = "bg-green-800";
  } else if (occupied) {
    seatColorClass = "bg-red-800";
  }

  return (
    <div
      className={`w-4 h-4 border border-gray-400 ${seatColorClass} cursor-pointer`}
      onClick={handleClick}
    ></div>
  );
}
