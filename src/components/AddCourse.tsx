import React, { useEffect, useState } from 'react';
import type { Course } from '../types/Course';
import courseService from '../service/CourseService';

interface AddCourseProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  refreshList:()=>{};
}

const AddCourse: React.FC<AddCourseProps> = ({ visible, onClose, onSuccess,refreshList }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPrerequisites, setSelectedPrerequisites] = useState<string[]>([]);
  const [prerequisiteOptions, setPrerequisiteOptions] = useState<Course[]>([]);

  const fetchPrerequisites = async () => {
    const response = await courseService.getAllCourses();
    setPrerequisiteOptions(response.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Course = {
      title,
      description,
      prerequisites: selectedPrerequisites.map((id) => Number(id)),
    };

    try {
      const response = await courseService.addCourse(payload);
      if (response.status === 200) {
        alert("Course Added");
        onSuccess();
        onClose();
        refreshList();
      }
    } catch (error) {
      alert("Course not added");
    }
  };

  useEffect(() => {
    if (visible) fetchPrerequisites();
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Add New Course</h2>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows={4}
              required
            />
          </div>

          {/* Prerequisites */}
          <div>
            <label htmlFor="prerequisites" className="block text-sm font-medium text-gray-700">Prerequisites</label>
            <select
              id="prerequisites"
              multiple
              value={selectedPrerequisites}
              onChange={(e) => {
                const ids = Array.from(e.target.selectedOptions, (option) => option.value);
                setSelectedPrerequisites(ids);
              }}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 h-40"
            >
              {prerequisiteOptions.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.title}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple.</p>
          </div>

          {/* Submit */}
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

export default AddCourse;
