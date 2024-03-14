import { API_URL } from "../settings";
import { MovieType } from "../types";
import { handleHttpErrors } from "./fetchUtils";

export async function getMoviesById(id: number): Promise<MovieType> {
  return await fetch(`${API_URL}/movies/${id}`).then(handleHttpErrors);
}

export async function getSchedulesByDateAndMovieIdAndCinemaId(
  date: string,
  movieId: number,
  cinemaId: number
) {
  return await fetch(
    `${API_URL}/schedules/${date}/movies/${movieId}/cinemas/${cinemaId}`
  ).then(handleHttpErrors);
}

export async function getCinemas() {
  return await fetch(`${API_URL}/cinemas`).then(handleHttpErrors);
}
