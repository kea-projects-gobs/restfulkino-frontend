const MovieDescriptionSkeleton = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-2 mx-auto mt-10 lg:w-[600px] bg-gray-100 p-4 rounded">
      <div className="animate-pulse w-[200px] h-[300px] rounded-xl bg-gray-300"></div>
      <div className="mx-6 w-[300px]">
        <div className="mb-2 bg-gray-300 rounded h-7 animate-pulse"></div>
        <div className="h-4 w-[150px] mb-2 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 w-[150px] mb-2 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 w-[150px] mb-2 bg-gray-300 rounded animate-pulse"></div>
        <div className="flex flex-col">
          <div className="w-[250px] h-4 mt-2 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-[250px] h-4 mt-2 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-[250px] h-4 mt-2 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default MovieDescriptionSkeleton;
