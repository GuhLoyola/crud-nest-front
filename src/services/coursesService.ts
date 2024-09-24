import axios from "axios"

const api_url = 'http://localhost:3000'

const api = axios.create({
    baseURL: api_url
})

export const courseService =  {

    async getCourses() {
        const response = await api.get('/courses');
        return response.data;
    },

    async getCoursesById(courseId: number) {
        const response = await api.get(`/courses/${courseId}`);

        return response.data;
    },

    async createCourse(courseData: any) {
        const response = await api.post('/courses', courseData);
        
        return response.data;
    },

    async updateCourse(courseId: number, courseData: {title: string, description: string}) {
        const response = await api.put(`/courses/${courseId}`, courseData)

        return response.data;
    },

    async deleteCourse(courseId: number) {
        const response = await api.delete(`/courses/${courseId}`);

        return response.data;
    }

}