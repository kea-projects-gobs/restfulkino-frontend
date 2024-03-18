import axios from "axios";
import axiosWithAuth from "../../services/axios";
import { Cinema } from "../../interfaces/interfaces";
import { API_URL } from "../../settings";

const API_URL_CINEMAS = `${API_URL}/cinemas`;

export const getCinemas = async () => {
  return axios.get(API_URL_CINEMAS);
};

export const getCinemaById = async (id: number) => {
  return axios.get(`${API_URL_CINEMAS}/${id}`);
};
// Example of function to fetch cinemas for a specific movie (not made in backend)
export const getCinemasForMovie = async (movieId: number) => {
  return axios.get(`${API_URL_CINEMAS}/movie/${movieId}/cinemas`);
};

export const createCinema = async (cinema: Cinema) => {
  return axiosWithAuth.post(API_URL_CINEMAS, cinema);
};

export const updateCinema = async (id: number, cinema: Cinema) => {
  return axiosWithAuth.put(`${API_URL_CINEMAS}/${id}`, cinema);
};

export const deleteCinema = async (id: number) => {
  return axiosWithAuth.delete(`${API_URL_CINEMAS}/${id}`);
};
