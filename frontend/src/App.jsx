import React, { useState, useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import axios from "axios";
import MainLayout from "./components/MainLayout";
import Login from "./components/Login";
import Cookies from "js-cookie";

function App() {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("access_token"); // Use js-cookie to get token

    // const accessToken = document.cookie
    //   .split("; ")
    //   .find((row) => row.startsWith("access_token="));
    console.log("Access Token", accessToken);
    if (accessToken) {
      setIsAuthenticated(true);
      axios
        .get("/auth/callback", {
          headers: { Authorization: `Bearer ${accessToken.split("=")[1]}` },
        })
        .then((response) => {
          setUserData(response.data.userData); // Set user data to state
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsAuthenticated(false);
        });
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/main"
        element={
          isAuthenticated ? (
            <MainLayout userData={userData} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Redirect the root path to either /main or /login based on authentication */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/main" : "/login"} />}
      />
    </Routes>
  );
}

export default App;
