import { useEffect, useState } from 'react';
import courseService from '../service/CourseService';
import type { Course } from '../types/Course';
import CourseDetails from './CourseDetails';

interface CourseListProps {
  allCourses: Course[];
  isLoading: boolean;
  filteredList: Course[];
}


const CourseList = ({ allCourses, isLoading, filteredList }: CourseListProps) => {
  const [searchParam, setSearchParam] = useState('');
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseDetailsLoading, setCourseDetailsLoading] = useState(false);

  const filterBasedOnSearch = (value: string) => {
    const filtered = allCourses.filter(course =>
      course.title.toLowerCase().includes(value.toLowerCase()) ||
      (course.description && course.description.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredCourses(filtered);
  };

  const handleDelete = async (courseId: number) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      setDeleteLoading(courseId);
      await courseService.deleteCourseById(courseId);
      if (selectedCourse?.courseId === courseId) {
        setSelectedCourse(null); // Deselect if the deleted one is open
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleCourseSelect = async (course: Course) => {
    if (selectedCourse?.courseId === course.courseId) return;

    try {
      setCourseDetailsLoading(true);
      const response = await courseService.getCourseById(course.courseId ?? 0);
      setSelectedCourse(response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
      setSelectedCourse(course); // Fallback to basic
    } finally {
      setCourseDetailsLoading(false);
    }
  };

  useEffect(() => {
    setFilteredCourses(filteredList);
  }, [filteredList]);

  const coursesToDisplay = filteredCourses.length > 0 ? filteredCourses : filteredList;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Loading courses...</span>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full">
      {/* Left Panel */}
      <div className="w-full pr-4 overflow-y-auto">
        <div className="space-y-6">
          {/* Search */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="font-medium">Search:</span>
              </div>
              <input
                type="text"
                placeholder="Search courses by title or description..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchParam}
                onChange={(e) => {
                  setSearchParam(e.target.value);
                  filterBasedOnSearch(e.target.value);
                }}
              />
              {searchParam && (
                <button
                  onClick={() => {
                    setSearchParam('');
                    setFilteredCourses(filteredList);
                  }}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Result Count */}
          <div className="text-slate-600">
            {searchParam ? (
              <>Showing {coursesToDisplay.length} of {allCourses.length} courses</>
            ) : (
              <>{allCourses.length} course{allCourses.length !== 1 ? 's' : ''} total</>
            )}
          </div>

          {/* Course List */}
          <div className="space-y-3">
            {coursesToDisplay.length === 0 ? (
              <div className="text-center py-12 text-slate-500">No courses found.</div>
            ) : (
              coursesToDisplay.map((course) => (
                <div
                  key={course.courseId}
                  className={`border rounded-lg p-6 hover:shadow-md cursor-pointer transition ${
                    selectedCourse?.courseId === course.courseId ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                  }`}
                  onClick={() => handleCourseSelect(course)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{course.title}</h3>
                      {course.description && (
                        <p className="text-sm text-slate-600 mt-1">{course.description}</p>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(course.courseId ?? 0);
                      }}
                      disabled={deleteLoading === course.courseId}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                      title="Delete course"
                    >
                      {deleteLoading === course.courseId ? (
                        <div className="animate-spin h-4 w-4 border-b-2 border-red-600 rounded-full"></div>
                      ) : (
                        <div>
                          Delete
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Panel (Course Details) */}
      {courseDetailsLoading ? (
        <div className="w-1/2 flex items-center justify-center text-slate-600">
          <div className="animate-spin h-6 w-6 border-b-2 border-blue-600 rounded-full mr-3"></div>
          Loading course details...
        </div>
      ) : (
        <CourseDetails course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
  );
};

export default CourseList;
