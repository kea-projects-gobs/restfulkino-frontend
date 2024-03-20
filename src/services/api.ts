import { API_URL } from "../settings";
import axios from "axios";
import axiosWithAuth from "../security/axios";
import { CreateReservationType, MovieType } from "../types";
import { Schedule } from "../interfaces/interfaces";
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

export async function getSchedulesById(id: number) {
  return await fetch(`${API_URL}/schedules/${id}`).then(handleHttpErrors);
}

export async function getCinemas() {
  return await fetch(`${API_URL}/cinemas`).then(handleHttpErrors);
}

export async function getSchedule() {
  return await axios.get(`${API_URL}/schedules`);
}

export async function createSchedule(schedule: Schedule) {
  return await axiosWithAuth.post(`${API_URL}/schedules`, schedule);
}

export async function updateSchedule(id: number, schedule: Schedule) {
  return await axiosWithAuth.put(`${API_URL}/schedules/${id}`, schedule);
}

export async function deleteSchedule(id: number) {
  return await axiosWithAuth.delete(`${API_URL}/schedules/${id}`);
}

export async function getHallByNameAndCinemaName(
  hallName: string,
  cinemaName: string
) {
  return await fetch(`${API_URL}/halls/${hallName}/cinemas/${cinemaName}`).then(
    handleHttpErrors
  );
}

export async function getReservedSeatsByScheduleId(scheduleId: number) {
  return await fetch(
    `${API_URL}/reservations/schedules/${scheduleId}/seats`
  ).then(handleHttpErrors);
}

export async function createReservation(reservation: CreateReservationType) {
  return await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservation),
  }).then(handleHttpErrors);
}
