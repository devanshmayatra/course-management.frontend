import type { Course } from '../types/Course';

const CourseDetails = ({ course, onClose }: { course: Course | null, onClose: () => void }) => {
  if (!course) {
    return (
      <div className="w-1/2 bg-slate-50 border-l border-slate-200 flex items-center justify-center">
        <div className="text-center text-slate-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-lg font-medium">Select a course</p>
          <p className="text-sm">Click on a course to view its details</p>
        </div>
      </div>
    );
  }

  const renderPrerequisiteTree = (prerequisites: Course[], level = 0) => {
    return prerequisites.map((prereq) => (
      <div key={prereq.courseId} className={`${level > 0 ? 'ml-6' : ''} mb-3`}>
        <div className="flex items-start gap-2">
          {level > 0 && (
            <div className="flex-shrink-0 w-4 h-6 border-l-2 border-b-2 border-slate-300 rounded-bl-lg mt-2"></div>
          )}
          <div className="bg-wh ite border border-slate-200 rounded-lg p-3 flex-1 shadow-sm">
            <h5 className="font-medium text-slate-900">{prereq.title}</h5>
            {prereq.description && (
              <p className="text-sm text-slate-600 mt-1">{prereq.description}</p>
            )}
          </div>
        </div>
        {prereq.prerequisites && prereq.prerequisites.length > 0 && (
          <div className="mt-2">
            {
              Array.isArray(prereq.prerequisites) && typeof prereq.prerequisites[0] === 'object' && (
                <div className="mt-0">
                  {renderPrerequisiteTree(prereq.prerequisites as Course[], level + 1)}
                </div>
              )
            }
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="w-1/2 bg-white border-l border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Course Details</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-colors"
            title="Close details"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{course.title}</h3>
            {course.description && (
              <p className="text-slate-700 leading-relaxed">{course.description}</p>
            )}
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-600">Course ID:</span>
              <span className="text-sm font-mono bg-white px-2 py-1 rounded border">{course.courseId}</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Prerequisites
            </h4>
            {course.prerequisites && course.prerequisites.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-slate-600 mb-4">
                  This course requires the following prerequisites:
                </p>
                <div className="bg-slate-50 rounded-lg p-4">
                  {
                    Array.isArray(course.prerequisites) && typeof course.prerequisites[0] === 'object' && (
                      <div className="mt-0">
                        {renderPrerequisiteTree(course.prerequisites as Course[])}
                      </div>
                    )
                  }
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">No prerequisites required</span>
                </div>
                <p className="text-green-600 text-sm mt-1">This course can be taken without any prior courses.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
