import axios from "axios"

const api_url = 'http://localhost:3000'

const api = axios.create({
    baseURL: api_url
});

export const userService = {

    async getUsers() {
        const response = await api.get('/user');
        return response.data;
    },

    async getUserbyId(userId: number) {
        const response = await api.get(`/user/${userId}`);

        return response.data;
    },

    async createUser(userData: any) {
        const response = await api.post('/user', userData);

        return response.data;
    },

    async updateUser(userId: number, userData: {name: string, email: string}) {
        const response = await api.put(`/user/${userId}`, userData);

        return response.data;
    },

    async deleteUser(userId: number) {
        const response = await api.delete(`/user/${userId}`);

        return response.data;
    }
}