import axios from 'axios';
import { UserData } from '../../interfaces/interfaces';

const API_BASE_URL = 'http://localhost:8080/api';

export const createUserWithRole = async (userData: UserData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user-with-role`, userData);
        return response.data; 
    } catch (error) {
        console.error('Error:', error);
         
    }
};