import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

interface UserData {
    email: string;
    username: string;
    password: string;
  }

export const createUserWithRole = async (userData: UserData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user-with-role`, userData);
        return response.data; 
    } catch (error) {
        throw error.response.data; 
    }
};