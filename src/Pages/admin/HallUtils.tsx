import axios from "axios";
import axiosWithAuth from "../../services/axios";
import { Hall } from "../../interfaces/interfaces";
import { API_URL } from "../../settings";

const API_URL_HALLS = `${API_URL}/halls`;

export const getHalls = async () => {
  return axios.get(API_URL_HALLS);
};

export const getHallsById = async (id: number) => {
  return axios.get(`${API_URL_HALLS}/${id}`);
};

export const createHall = async (hall: Hall) => {
  return axiosWithAuth.post(API_URL_HALLS, hall);
};

export const updateHall = async (id: number, hall: Hall) => {
  return axiosWithAuth.put(`${API_URL_HALLS}/${id}`, hall);
};

export const deleteHall = async (id: number) => {
  return axiosWithAuth.delete(`${API_URL_HALLS}/${id}`);
};

export const getHallsByCinemaId = async (cinemaId: number) => {
  return axios.get(`${API_URL_HALLS}/cinema/${cinemaId}`);
};
