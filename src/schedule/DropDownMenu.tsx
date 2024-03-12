import { useState } from "react";
import DropDownItem from "./DropDownItem";
import { CinemaType } from "../types";

type DropDownMenuProps = {
  cinemas: CinemaType[];
  handleCinemaSelect: (cinema: CinemaType) => void;
};

export default function DropDownMenu({
  cinemas,
  handleCinemaSelect,
}: DropDownMenuProps) {
  // Should take in a list of cinemas and display them in a dropdown menu

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState<CinemaType>();

  const dropDownSelect = (item: CinemaType) => {
    console.log(item);
    setSelectedCinema(item);
    handleCinemaSelect(item);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="w-[350px] h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center inline-flex items-center justify-center"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCinema ? (
          <span>{selectedCinema.name}</span>
        ) : (
          <span>Vælg biograf</span>
        )}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow top-12 w-[350px]  ">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {cinemas.map((cinema: CinemaType) => (
              <DropDownItem
                key={cinema.id}
                item={cinema}
                selectItem={dropDownSelect}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
