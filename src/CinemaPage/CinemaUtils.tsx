import axios from 'axios'
import { Cinema } from '../interfaces/interfaces';


const API_URL = 'http://localhost:8080/api/cinemas'

export const getCinemas = async () => {
  return axios.get(API_URL)
}

export const getCinemaById = async (id: number) => {
  return axios.get(`${API_URL}/${id}`)
}

export const createCinema = async (cinema: Cinema) => {
  return axios.post(API_URL, cinema)
}

export const updateCinema = async (id: number, cinema: Cinema) => {
  return axios.put(`${API_URL}/${id}`, cinema)
}

export const deleteCinema = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`)
}

