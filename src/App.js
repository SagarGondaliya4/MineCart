import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  redirect,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SignIn } from "./pages/signIn/SignIn";
import { SignUp } from "./pages/signUp/SignUp";
import { Navbar } from "./components/navbar/Navbar";
import { User } from "./pages/user/User";
import View from "./pages/view/View";
import Create from "./pages/create/Create";
import { Update } from "./pages/update/Update";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const signUpData = JSON.parse(localStorage.getItem("signUpData"));
    if (signUpData) {
      setIsLoggedIn(true);
      setUserName(signUpData.username);
    }
  }, []);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUserName(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
    localStorage.removeItem("signUpData");
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={userName}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<SignIn handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp handleLogin={handleLogin} />} />
        <Route path="/user" element={<User isLoggedIn={isLoggedIn} />} />
        <Route
          path="/user/create"
          element={<Create isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/user/update/:id"
          element={<Update isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/user/read/:id"
          element={<View isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </>
  );
}

export default App;
