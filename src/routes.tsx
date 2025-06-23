import { Route, Routes } from "react-router-dom"
import CoursePage from "./components/CoursePage"
import Instance from "./components/Instance"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={`/course`} element={<CoursePage/>}/>
      <Route path={`/instance`} element={<Instance/>}/>
    </Routes>
  )
}