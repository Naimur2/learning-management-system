import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/404";
import Cart from "./pages/cart/cart";
import CourseDetails from "./pages/course-details/course-details";
import Courses from "./pages/courses/courses";
import DashboardPrivateRoute from "./pages/dashboard-route";
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import MyCourses from "./pages/my-courses/my-courses";
import NavBar from "./pages/navbar/navbar";
import Register from "./pages/register/register";
import UserPrivateRoute from "./pages/user-route";
import Wishlist from "./pages/wishlist/wishlist";
import React from "react";
import AddCourse from "./pages/add-course/add-course";

export default function App() {
    // const isAuthenticatedUser = React.useCallback((token) => {
    //     const validToken = async () => {
    //         const response = await fetch(
    //             "http://localhost:5000/api/users/validate",
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );
    //         const data = await response.json();
    //         return data;
    //     };
    // }, deps);

    // React.useEffect(() => {
    //     const token = localStorage.getItem("token");
    // }, []);

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/course/:id" element={<CourseDetails />} />
                <Route path="/courses/" element={<Courses />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<DashboardPrivateRoute />}>
                    <Route path="/dashboard/" element={<Dashboard />} />
                    <Route
                        path="/dashboard/add-course/"
                        element={<AddCourse />}
                    />
                </Route>
                <Route path="/user/" element={<UserPrivateRoute />}>
                    <Route path="/user/" element={<Home />} />
                    <Route path="/user/cart/" element={<Cart />} />
                    <Route path="/user/wishlist/" element={<Wishlist />} />
                    <Route path="/user/mycourses/" element={<MyCourses />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}
