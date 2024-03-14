import axios from "axios";
import { Cinema } from "../../interfaces/interfaces";
import { API_URL } from "../../settings";

export const getCinemas = async () => {
  return axios.get(API_URL);
};

export const getCinemaById = async (id: number) => {
  return axios.get(`${API_URL}/${id}`);
};
// Example of function to fetch cinemas for a specific movie (not made in backend)
export const getCinemasForMovie = async (movieId: number) => {
  return axios.get(`${API_URL}/movie/${movieId}/cinemas`);
};

export const createCinema = async (cinema: Cinema) => {
  return axios.post(API_URL, cinema);
};

export const updateCinema = async (id: number, cinema: Cinema) => {
  return axios.put(`${API_URL}/${id}`, cinema);
};

export const deleteCinema = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};
