import { api } from "../utils/util"

class CourseInstanceService {

  getAllCourseInstance = async () => {
    try {
      const response = await api.get('/instance');
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  getCourseInstanceBySemAndYear = async (sem: number, year: number) => {
    try {
      const response = await api.get(`/instance/${year}/${sem}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  deleteCourseById = async (payload : {
    semester:number,
    year:number,
    courseId:number
  }) => {
    try {
      const response = await api.delete(`/instance/${payload.year}/${payload.semester}/${payload.courseId}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  addCourseInstance = async (payload: {
    semester: number,
    year: number,
    courseIds: number[],
  }) => {
    try {
      const response = await api.post(`/instance`, payload);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
      }
    }
  }

};




const courseInstanceService = new CourseInstanceService();

export default courseInstanceService;
