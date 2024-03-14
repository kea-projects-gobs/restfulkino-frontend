type ScheduleType = {
  id: number;
  startTime: string;
  date: Date;
  movieTitle: string;
  hallName: string;
  cinemaName: string;
  is3d: boolean;
  isLongMovie: boolean;
};

type CinemaType = {
  id: number;
  name: string;
  city: string;
  street: string;
  description: string;
  phone: string;
  email: string;
  imageUrl: string;
};

type MovieType = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  trailerUrl: string;
  duration: number;
  releaseDate: string;
  genre: string;
  director: string;
  cast: string[];
};

export type { ScheduleType, CinemaType, MovieType };