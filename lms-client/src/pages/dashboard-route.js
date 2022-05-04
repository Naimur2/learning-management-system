import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import MainContext from "./../store/main-context";
import React from "react";

export default function DashboardPrivateRoute() {
    const auth = useAuth();

    console.log(auth);
    return auth && auth.role === "admin" ? <Outlet /> : <Navigate to="/" />;
}
