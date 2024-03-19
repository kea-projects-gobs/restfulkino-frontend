import axios from 'axios';
import { UserData } from '../../interfaces/interfaces';
import { API_URL } from '../../settings';


export const createUserWithRole = async (userData: UserData) => {
    try {
        const response = await axios.post(`${API_URL}/user-with-role`, userData);
        return response.data; 
    } catch (error) {
        console.error('Error:', error);
         
    }
};