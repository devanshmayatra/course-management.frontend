import React, { useEffect, useState } from 'react';
import type { Course } from '../types/Course';
import courseInstanceService from '../service/CourseInstanceService';

interface Props {
  allCourses: Course[];
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateCourseInstance: React.FC<Props> = ({ allCourses, visible, onClose, onSuccess }) => {
  const [semester, setSemester] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [courseOptions, setCourseOptions] = useState<Course[]>([]);

  useEffect(() => {
    if (visible) {
      setCourseOptions(allCourses);
    }
  }, [visible, allCourses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      semester,
      year,
      courseIds: selectedCourses.map(Number),
    };
    console.log(payload);
    await courseInstanceService.addCourseInstance(payload)
    if (onSuccess) onSuccess();

    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Add Course Offering</h2>

          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
            <input
              id="semester"
              type="number"
              value={semester}
              onChange={(e) => setSemester(Number(e.target.value))}
              min={1}
              max={8}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="courseIds" className="block text-sm font-medium text-gray-700">Select Courses</label>
            <select
              id="courseIds"
              multiple
              value={selectedCourses}
              onChange={(e) => {
                const ids = Array.from(e.target.selectedOptions, (opt) => opt.value);
                setSelectedCourses(ids);
              }}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 h-40"
            >
              {courseOptions.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.title}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseInstance;
