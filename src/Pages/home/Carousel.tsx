import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { getMovies } from "../movie/MovieUtils";
import { Movie } from "../../interfaces/interfaces";


function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState<Movie[]>([]);
  const [movies, setMovies] = useState <Movie[]> ([])
  const fetchMovies = async () => {
  const response = await getMovies()
  setMovies(response.data)
  console.log(response.data);
  
}

useEffect(() => {fetchMovies()}, [])
useEffect(() => {
  setSlides(movies);
}, [movies]);


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

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
  
    <div className="max-w-[1440px] h-[600px] w-full m-auto  px-4 relative group">
      <div>
      {slides.map((movie) => {
        return (
          <div
            key={movie.id}
            className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
            style={{ backgroundImage: `url(${movie.imageUrl})` }}
          ></div>
        );
      })}
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>

      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>

      <div className="flex top-4 justify-center py-2">
        {movies.map((_, slideIndex) => (
          <div key={slideIndex} onClick ={() => goToSlide(slideIndex)} 
          className="text-2xl cursor-pointer">
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
