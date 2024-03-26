const SeatGridSkeleton = () => {
  return (
    <div className="flex flex-row max-w-[400px] mx-auto content-center">
      <div className="flex flex-col w-6"></div>
      <div className={`grid grid-cols-10 gap-2 max-w-[350px] content-center`}>
        {[...Array(100).keys()].map(index => (
          <div
            key={index}
            className="w-4 h-4 bg-gray-300 rounded animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SeatGridSkeleton;
