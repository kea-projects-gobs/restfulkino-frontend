import axios from 'axios'
import { Hall } from '../../interfaces/interfaces';


const API_URL = 'http://localhost:8080/api/halls'

export const getHalls = async () => {
  return axios.get(API_URL)
}

export const getHallsById = async (id: number) => {
  return axios.get(`${API_URL}/${id}`)
}

export const createHall = async (hall: Hall) => {
  return axios.post(API_URL, hall)
}

export const updateHall = async (id: number, hall: Hall) => {
  return axios.put(`${API_URL}/${id}`, hall)
}

export const deleteHall = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`)
}

