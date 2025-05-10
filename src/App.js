import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/Account/Register";
import Login from "./pages/Account/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Account/Profile";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    logged: false,
    username: "",
  });

  useEffect(() => {
    if (localStorage.getItem("accessToken"))
      axios
        .get("http://localhost:3001/auth", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          if (!res.data.success) {
            setAuthState({
              id: 0,
              logged: false,
              username: "",
            });
          }
          setAuthState({
            id: res.data.data.id,
            logged: true,
            username: res.data.data.username,
          });
        });
  }, []);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/register" element={<Register />} />
            <Route path="/account/profile/:id" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default App;
