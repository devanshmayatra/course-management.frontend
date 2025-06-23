import { useState, useEffect } from "react";
import type { CourseInstance } from "../types/CourseInstance";
import type { Course } from "../types/Course";
import courseInstanceService from "../service/CourseInstanceService";

interface CourseInstanceListProps {
  instances: CourseInstance[];
  isLoading: boolean;
  onSave: () => Promise<void>;
}

const CourseInstancesList = ({ instances, isLoading, onSave }: CourseInstanceListProps) => {
  const [search, setSearch] = useState("");
  const [filteredInstances, setFilteredInstances] = useState<CourseInstance[]>(instances);
  const [selectedInstance, setSelectedInstance] = useState<CourseInstance | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredInstances(instances);
    } else {
      const filtered = instances.filter(instance =>
        instance.courses.some(course =>
          course.title.toLowerCase().includes(search.toLowerCase())
        )
      );
      setFilteredInstances(filtered);
    }
  }, [search, instances]);

  const handleInstanceClick = (instance: CourseInstance) => {
    setSelectedInstance(instance);
    setSelectedCourse(null);
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setSelectedInstance(null);
  };

  const handleDeleteCourse = async (instance: CourseInstance, course: Course) => {
    const payload = {
      year: instance.year,
      semester: instance.semester,
      courseId: course.courseId!,
    };

    const response = await courseInstanceService.deleteCourseById(payload);
    if(response.status === 200){
      onSave();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin h-6 w-6 border-b-2 border-blue-500 rounded-full mr-3" />
        <span className="text-slate-600">Loading course instances...</span>
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      {/* Left: List */}
      <div className="w-2/3 space-y-6">
        {/* Search Bar */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border border-blue-200">
          <input
            type="text"
            placeholder="Search by course title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Count */}
        <div className="text-slate-600">
          {search
            ? `Showing ${filteredInstances.length} of ${instances.length} instances`
            : `${instances.length} course instance${instances.length !== 1 ? "s" : ""}`}
        </div>

        {/* Instance List */}
        {filteredInstances.length === 0 ? (
          <div className="text-center text-slate-500 py-10">No matching course instances found.</div>
        ) : (
          <div className="space-y-4">
            {filteredInstances.map(instance => (
              <div
                key={instance.courseInstanceId}
                onClick={() => handleInstanceClick(instance)}
                className={`border rounded-lg p-5 bg-white shadow transition cursor-pointer ${
                  selectedInstance?.courseInstanceId === instance.courseInstanceId ? "border-blue-500 bg-blue-50" : "border-slate-200"
                }`}
              >
                <div className="mb-2 font-semibold text-slate-800">
                  Year: {instance.year} | Semester: {instance.semester}
                </div>

                <div className="pl-2">
                  {instance.courses.length === 0 ? (
                    <div className="text-sm text-slate-500 italic">No courses linked to this instance.</div>
                  ) : (
                    <ul className="list-disc list-inside space-y-1">
                      {instance.courses.map(course => (
                        <li key={course.courseId} className="flex justify-between items-start gap-2">
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCourseClick(course);
                            }}
                            className="hover:text-blue-600 underline cursor-pointer flex-1"
                          >
                            {course.title} — <span className="text-slate-500">{course.description}</span>
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCourse(instance, course);
                            }}
                            className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
                            title="Remove course from instance"
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: Details */}
      <div className="w-1/3 bg-white border border-slate-200 rounded-xl p-4 shadow-sm h-fit sticky top-6">
        {selectedCourse ? (
          <>
            <h3 className="text-lg font-bold text-blue-700 mb-2">Course Details</h3>
            <p><strong>Title:</strong> {selectedCourse.title}</p>
            <p><strong>Description:</strong> {selectedCourse.description || "No description"}</p>
            {selectedCourse.prerequisites?.length > 0 && (
              <>
                <p className="mt-2 font-semibold">Prerequisites:</p>
                <ul className="list-disc list-inside ml-4">
                  {selectedCourse.prerequisites.map(pr => (
                    <li key={pr.courseId}>{pr.title || 'Untitled Course'}</li>
                  ))}
                </ul>
              </>
            )}
          </>
        ) : selectedInstance ? (
          <>
            <h3 className="text-lg font-bold text-indigo-700 mb-2">Instance Details</h3>
            <p><strong>Year:</strong> {selectedInstance.year}</p>
            <p><strong>Semester:</strong> {selectedInstance.semester}</p>
            <p><strong>Courses Linked:</strong> {selectedInstance.courses.length}</p>
          </>
        ) : (
          <p className="text-slate-500 italic">Click on an instance or course to view details.</p>
        )}
      </div>
    </div>
  );
};

export default CourseInstancesList;
