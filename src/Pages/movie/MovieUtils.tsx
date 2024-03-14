import axios from 'axios'
import { Movie } from '../../interfaces/interfaces';


const API_URL = 'http://localhost:8080/api/movies'

export const getMovies = async () => {
  return axios.get(API_URL)
}

export const getMovieById = async (id: number) => {
  return axios.get(`${API_URL}/${id}`)
}

export const createMovie = async (movie: Movie) => {
  return axios.post(API_URL, movie)
}

export const updateMovie = async (id: number, movie: Movie) => {
  return axios.put(`${API_URL}/${id}`, movie)
}

export const deleteMovie = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`)
}

