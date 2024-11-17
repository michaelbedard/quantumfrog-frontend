import axios from 'axios';

const url = 'https://quantumfrog-backend.onrender.com';
// const url = 'http://127.0.0.1:5000';

export async function registerUser() {
    try {
        const response = await axios.get('/register_user');
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Re-throw the error for further handling if necessary
    }
}


export async function getUserData() {
    try {
        const response = await axios.get('/get_user');
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Re-throw the error for further handling if necessary
    }
}










