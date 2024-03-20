type ScheduleType = {
  id: number;
  startTime: string;
  endTime: string;
  date: string;
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

type SeatType = {
  id: number;
  seatIndex: number;
  currentPrice: number;
  hallId: number;
};

type CreateReservationType = {
  scheduleId: number;
  seatIndexes: number[];
};

export type {
  ScheduleType,
  CinemaType,
  MovieType,
  SeatType,
  CreateReservationType,
};
