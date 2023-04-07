import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="text-gray-600 body-font shadow-lg">
        <div className="container flex p-4 flex-col md:flex-row items-center justify-between">
          <Link
            to="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <span className="ml-3 text-xl">Bank Token</span>
          </Link>
          {!(
            localStorage.getItem("counterid") || localStorage.getItem("adminId")
          ) && (
            <nav className="flex flex-wrap space-x-12 items-center text-base justify-center">
              <Link to="/login/admin" className=" hover:text-gray-900">
                Admin Login
              </Link>
              <Link
                to="/login/counter-executive"
                className=" hover:text-gray-900"
              >
                Counter Executive Login
              </Link>
            </nav>
          )}
          {(localStorage.getItem("adminId") ||
            localStorage.getItem("counterid")) && (
            <button
              type="button"
              onClick={() => {
                if (localStorage.getItem("adminId")) {
                  localStorage.removeItem("adminId");
                  navigate("/login/admin");
                } else {
                  localStorage.removeItem("counterid");
                  navigate("/login/counter-executive");
                }
                toast.success("Logged out.", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }}
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              Logout
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
