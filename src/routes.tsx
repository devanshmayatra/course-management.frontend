import { Route, Routes } from "react-router-dom"
import Course from "./components/Course"
import Instance from "./components/Instance"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={`/course`} element={<Course/>}/>
      <Route path={`/instance`} element={<Instance/>}/>
    </Routes>
  )
}