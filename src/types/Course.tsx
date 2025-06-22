export interface Course{
  courseId?:number,
  description:string,
  title:string,
  prerequisites:Course[] | number[]
}