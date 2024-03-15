import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const loginUser = async (userData: { username: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};