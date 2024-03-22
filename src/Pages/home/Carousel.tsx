import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { getMovies } from "../movie/MovieUtils";
import { getSchedule } from "../../services/api";
import { Movie, Schedule } from "../../interfaces/interfaces";
import { useNavigate } from "react-router";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    <div className="h-[600px] w-[400px] m-auto relative group">
      {slides.map((movie, index) => {
        return (
          <div
            key={movie.id}
            className={`h-full rounded-md bg-center bg-contain duration-500 ${
              currentIndex === index ? "block" : "hidden"
            }`}
            style={{ backgroundImage: `url(${movie.imageUrl})` }}
            onClick={() => navigate(`schedules/movies/${movie.id}`)}
          ></div>
        );
      })}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] left-1 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-1 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex justify-center py-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`mx-1 text-2xl cursor-pointer ${
              currentIndex === index ? "text-white" : "text-gray-400"
            }`}
            onClick={() => goToSlide(index)}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;