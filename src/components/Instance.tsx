import { useEffect, useState } from "react";
import CreateCourseInstance from "./CreateCourseInstance";
import type { CourseInstance } from "../types/CourseInstance";
import courseInstanceService from "../service/CourseInstanceService";
import courseService from "../service/CourseService";
import type { Course } from "../types/Course";
import CourseInstanceList from "./COurseInstanceList";

const Instance = () => {
  const [showCreateInstancePopup, setShowCreateInstancePopup] = useState(false);
  const [allCoursesInstances, setAllCoursesInstances] = useState<CourseInstance[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllCourses = async () => {
    try {
      setIsLoading(true);
      const courseInstance = await courseInstanceService.getAllCourseInstance();
      const courses = await courseService.getAllCourses();
      setAllCoursesInstances(courseInstance.data);
      setAllCourses(courses.data)
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Header Section */}
      <div className="max-w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setShowCreateInstancePopup(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Course Instance
          </button>
        </div>

        {/* Full-Width Course List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Your Courses</h2>
          </div>
          <div className="p-6 w-full">
            <CourseInstanceList instances={allCoursesInstances} isLoading={isLoading} onSave={getAllCourses}/>
          </div>
        </div>
      </div>

      <CreateCourseInstance
        visible={showCreateInstancePopup}
        onClose={() => setShowCreateInstancePopup(false)}
        onSuccess={() => {
          setShowCreateInstancePopup(false);
          getAllCourses();
        }}
        allCourses={allCourses}
      />
    </div>
  )
}

export default Instance
