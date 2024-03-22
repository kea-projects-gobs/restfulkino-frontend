import { CinemaType } from "../../types/types";

type DropDownItemProps = {
  item: CinemaType;
  selectItem: (item: CinemaType) => void;
};

export default function DropDownItem({ item, selectItem }: DropDownItemProps) {
  const handleClick = () => {
    selectItem(item);
  };

  return (
    <li onClick={handleClick}>
      <p className="px-4 py-2 hover:bg-gray-100 hover:cursor-pointer">
        {item.name}
      </p>
    </li>
  );
}
