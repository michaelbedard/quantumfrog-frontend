import axios from 'axios';


export async function registerUser() {
    try {
        const response = await axios.get('https://quantumfrog-backend.onrender.com/register_user', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Re-throw the error for further handling if necessary
    }
}


export async function getUserData() {
    try {
        const response = await axios.get('https://quantumfrog-backend.onrender.com/get_user', {
            headers: {
                'Accept': 'application/json', // Tells the server you expect JSON
                'Content-Type': 'application/json' // Optional: used for POST/PUT requests with JSON payload
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Re-throw the error for further handling if necessary
    }
}










