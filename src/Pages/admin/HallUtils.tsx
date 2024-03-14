import axios from "axios";
import { Hall } from "../../interfaces/interfaces";
import { API_URL } from "../../settings";

const API_URL_HALLS = `${API_URL}/halls`;

export const getHalls = async () => {
  return axios.get(API_URL_HALLS);
};

export const getHallsById = async (id: number) => {
  return axios.get(`${API_URL_HALLS}/${id}`);
};

export const createHall = async (cinema: Hall) => {
  return axios.post(API_URL_HALLS, cinema);
};

export const updateHall = async (id: number, cinema: Hall) => {
  return axios.put(`${API_URL_HALLS}/${id}`, cinema);
};

export const deleteHall = async (id: number) => {
  return axios.delete(`${API_URL_HALLS}/${id}`);
};
