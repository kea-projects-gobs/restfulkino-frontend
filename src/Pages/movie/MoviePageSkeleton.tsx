const MoviePageSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {[...Array(6)].map((_, index) => (
        <div
          className="mx-1 my-2 p-4 shadow-md bg-gray-100 rounded-md w-80 h-[30rem] flex flex-col"
          key={index}
        >
          <div className="self-center w-3/4 h-8 mb-2 bg-gray-300 rounded animate-pulse"></div>
          <div className="flex items-center justify-center flex-grow overflow-hidden">
            <div className="animate-pulse bg-gray-300 w-full h-[20rem]"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviePageSkeleton;
