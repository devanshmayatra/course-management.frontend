import { useEffect, useState } from "react";
import AddCourse from "./AddCourse"
import CourseList from "./CourseList"
import courseService from "../service/CourseService";
import type { Course } from "../types/Course";

const CoursePage = () => {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllCourses = async () => {
    try {
      setIsLoading(true);
      const { data } = await courseService.getAllCourses();
      setAllCourses(data);
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
            onClick={() => setShowAddPopup(true)}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Course
          </button>
        </div>

        {/* Full-Width Course List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Your Courses</h2>
          </div>
          <div className="p-6 w-full">
            <CourseList allCourses={allCourses} isLoading={isLoading} filteredList={allCourses} />
          </div>
        </div>
      </div>

      {/* Add Course Modal */}
      <AddCourse
        visible={showAddPopup}
        onClose={() => setShowAddPopup(false)}
        onSuccess={() => setShowAddPopup(false)}
        refreshList={getAllCourses}
      />
    </div>

  )
}

export default CoursePage