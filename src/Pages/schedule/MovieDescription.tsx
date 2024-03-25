import { MovieType } from "../../types/types";

type MovieDescriptionProps = {
  movie: MovieType | undefined;
};

export default function MovieDescription({ movie }: MovieDescriptionProps) {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-2 mx-auto mt-10 lg:w-[600px] bg-gray-100 p-4 rounded">
      {/* <div className="flex-wrap justify-center"> */}
      <img className="w-[200px] rounded-xl" src={movie?.imageUrl} />
      <div className="mx-6 max-w-[300px]">
        <h1 className="text-xl font-bold">{movie?.title}</h1>
        <p className="text-sm opacity-65">{movie?.releaseDate}</p>
        <span className="text-sm opacity-65">{movie?.duration} minutter</span>
        {movie?.genre != null && (
          <span className="text-sm opacity-65"> - {movie.genre}</span>
        )}
        <p className="text-sm opacity-65">{movie?.cast}</p>
        <p className="mt-2 text">{movie?.description}</p>
      </div>
    </div>
  );
}
