import axios from "axios";
import axiosWithAuth from "../../services/axios";
import { Movie } from "../../interfaces/interfaces";
import { API_URL } from "../../settings";

const API_URL_MOVIES = `${API_URL}/movies`;

export const getMovies = async () => {
  return axios.get(API_URL_MOVIES);
};

export const getMovieById = async (id: number) => {
  return axios.get(`${API_URL_MOVIES}/${id}`);
};

export const createMovie = async (movie: Movie) => {
  return axiosWithAuth.post(API_URL_MOVIES, movie);
};

export const updateMovie = async (id: number, movie: Movie) => {
  return axiosWithAuth.put(`${API_URL_MOVIES}/${id}`, movie);
};

export const deleteMovie = async (id: number) => {
  return axiosWithAuth.delete(`${API_URL_MOVIES}/${id}`);
};
