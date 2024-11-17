import axios from 'axios';

export async function registerUser() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/register_user');
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export async function traverseGate(clientId: number, gate: string) {
    try {
        const response = await axios.get('http://127.0.0.1:5000/traverse_gate', {
            params: {
                id: clientId, // Adds clientId as a query parameter
                gate : gate,     // Adds gate as a query parameter
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export async function getProbability(clientId: number) {
    try {
        const response = await axios.get('http://127.0.0.1:5000/get_probability', {
            params: {
                id: clientId, // Adds clientId as a query parameter
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export async function getBracket() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/get_bracket');
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}











