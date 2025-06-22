import type { Course } from "../types/Course";
import { api } from "../utils/util"

class CourseService {

  getAllCourses = async () => {
    try {
      const response = await api.get('/courses');
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  getCourseById = async (id: number) => {
    try {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  deleteCourseById = async (id: number) => {
    try {
      const response = await api.delete(`/courses/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  addCourse = async (payload : Course)=> {
    try {
      const response = await api.post(`/courses/add`,payload);
      return response.data;
    } catch (error) {
      if(error instanceof Error){
        console.log(error)
      }
    }
  }

};




const courseService = new CourseService();

export default courseService;
