import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import UserPage from "../pages/UserPage/UserPage"
import AddUser from "../pages/addUser/AddUser"
import CoursePage from "../pages/CoursePage/CoursePage"
import AddCourse from "../pages/addCourse/AddCourse"


const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/user" element={<UserPage/>} />
            <Route path="/courses" element={<CoursePage/>} />
            <Route path="/add-user" element={<AddUser/>} />
            <Route path="/add-course" element={<AddCourse/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes