import axios from 'axios';


export async function registerUser() {
    try {
        const response = await axios.get('https://quantumfrog-backend.onrender.com/register_user');
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Re-throw the error for further handling if necessary
    }
}


export async function getUserData() {
    try {
        const response = await axios.get('https://quantumfrog-backend.onrender.com/get_user');
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Re-throw the error for further handling if necessary
    }
}










