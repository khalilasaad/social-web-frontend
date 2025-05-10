import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../helpers/AuthContext";

const Menu = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      id: 0,
      username: "",
      logged: false,
    });
    toast.success("Logged out successfully");
    navigate("/account/login");
  };

  return (
    <div className=" bg-gray-200">
      <Link to={"/"}>
        <div className="p-4 border-b border-white font-bold text-xl text-center hover:bg-gray-100">
          Home
        </div>
      </Link>
      <Link to={`/account/profile/${authState.id}`}>
        <div className="p-4 border-b border-white font-bold text-xl text-center hover:bg-gray-100">
          Account
        </div>
      </Link>
      <button
        onClick={logout}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Menu;
