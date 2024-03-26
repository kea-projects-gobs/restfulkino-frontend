const CarouselSkeleton = () => {
  return (
    <div className="w-[200px] mx-auto">
      <div className="relative flex flex-col justify-center w-full">
        <div className="h-[300px] bg-gray-300 rounded-md animate-pulse"></div>
        <div className="absolute flex p-2 text-2xl text-white transition-opacity -translate-y-1/2 bg-gray-300 rounded-full cursor-pointer top-1/2 left-4 md:opacity-0">
          {/* Placeholder for left navigation button */}
        </div>
        <div className="absolute flex p-2 text-2xl text-white transition-opacity -translate-y-1/2 bg-gray-300 rounded-full cursor-pointer top-1/2 right-4 md:opacity-0">
          {/* Placeholder for right navigation button */}
        </div>
        <div className="flex justify-center py-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="mx-1 text-lg text-gray-400 md:text-2xl">
              {/* Placeholder for navigation dots */}
              <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselSkeleton;
