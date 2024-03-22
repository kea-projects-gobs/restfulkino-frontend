import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { getMovies } from "../../services/api/MovieUtils";
import { getSchedule } from "../../services/api/api";
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
      <div className="flex absolute top-1/2 -translate-y-1/2 left-4 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer md:opacity-0 group-hover:opacity-100 transition-opacity">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="flex absolute top-1/2 -translate-y-1/2 right-4 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer md:opacity-0 group-hover:opacity-100 transition-opacity">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex justify-center py-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`mx-1 text-lg md:text-2xl cursor-pointer ${
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
