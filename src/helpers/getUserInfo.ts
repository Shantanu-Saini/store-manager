import axios from 'axios';

export async function getUserInfo () {
    try {
        const response = await axios.get('/api/user/userinfo');
        if (response.data && response.data.userData) {
            return response.data.userData;
        }
        return null;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
};
