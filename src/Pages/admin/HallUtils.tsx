import axios from "axios";
import { Hall } from "../../interfaces/interfaces";
import { API_URL } from "../../settings";

export const getHalls = async () => {
  return axios.get(API_URL);
};

export const getHallsById = async (id: number) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createHall = async (cinema: Hall) => {
  return axios.post(API_URL, cinema);
};

export const updateHall = async (id: number, cinema: Hall) => {
  return axios.put(`${API_URL}/${id}`, cinema);
};

export const deleteHall = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};
