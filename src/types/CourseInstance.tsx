import type { Course } from "./Course";

export interface CourseInstance {
  courseInstanceId?: number;
  semester: number;
  year: number;
  courses: Course[];
}
