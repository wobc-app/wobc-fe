import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import Filter from "../components/bikes/actions/Filter";
import LoginRegisterForm from "../components/auth/LoginRegisterForm";
import Header from "../components/Header";
import Logout from "../components/Logout";
import Sidebar from "../components/Sidebar";
import Add from "../components/bikes/actions/Add";
import Edit from "../components/bikes/actions/Edit";
import Search from "../components/bikes/actions/Search";
import { useAuth } from "../state/authContext";

const AuthenticatedRoutes = () => (
  <div className="">
    <div className="">
      <Header />
      <Sidebar />
    </div>
    <div className="mt-16">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<Add add={true} />} />
        <Route exact path="/edit/:serial" element={<Edit />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  </div>
);

const UnauthenticatedRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginRegisterForm />} />
  </Routes>
);

export const RouteTree = () => {
  const { loggedIn } = useAuth();

  useEffect(() => {
    return loggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
  }, [loggedIn]);

  return loggedIn ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
};