import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { getMovies } from "../../services/api/MovieUtils";
import { getSchedule } from "../../services/api/api";
import { Movie, Schedule } from "../../interfaces/interfaces";
import { useNavigate } from "react-router";
import CarouselSkeleton from "./CarouselSkeleton";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchMoviesAndSchedules = async () => {
      const movieResponse = await getMovies();
      const scheduleResponse = await getSchedule();
      const scheduledMovieTitles = new Set(
        scheduleResponse.data.map((schedule: Schedule) => schedule.movieTitle)
      );
      const moviesWithSchedules = movieResponse.data.filter((movie: Movie) =>
        scheduledMovieTitles.has(movie.title)
      );
      setSlides(moviesWithSchedules);
      setLoading(false);
    };
    fetchMoviesAndSchedules();
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {loading ? (
        <CarouselSkeleton />
      ) : (
        <div className="">
          <div className="relative flex flex-col justify-center mx-auto w-[200px] m-auto group">
            {slides.map((movie, index) => {
              return (
                <div
                  key={movie.id}
                  className={`hover:cursor-pointer h-[300px] w-[200px] rounded-md bg-center bg-cover duration-500 ${
                    currentIndex === index ? "block" : "hidden"
                  }`}
                  style={{ backgroundImage: `url(${movie.imageUrl})` }}
                  onClick={() => navigate(`schedules/movies/${movie.id}`)}
                ></div>
              );
            })}
            <div className="absolute flex p-2 text-2xl text-white transition-opacity -translate-y-1/2 rounded-full cursor-pointer top-1/2 left-4 bg-black/20 md:opacity-0 group-hover:opacity-100">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div className="absolute flex p-2 text-2xl text-white transition-opacity -translate-y-1/2 rounded-full cursor-pointer top-1/2 right-4 bg-black/20 md:opacity-0 group-hover:opacity-100">
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className="flex justify-center py-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`mx-1 text-lg md:text-2xl cursor-pointer ${
                    currentIndex === index ? "text-gray-300" : "text-gray-600"
                  }`}
                  onClick={() => goToSlide(index)}
                >
                  <RxDotFilled />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Carousel;
