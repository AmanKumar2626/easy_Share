import axios from 'axios';
import { getEmail } from './mails';
const API_BASE_URL = 'https://easy-share-backend.onrender.com'; 

export const sendEmailAPI = async () => {
  try {
    const mail = {getEmail};
    const response = await axios.post(`${API_BASE_URL}/email`, mail );
    return response.data; 
  } catch (error) {
    console.log('Error while calling the API ', error.message);
  }
};
