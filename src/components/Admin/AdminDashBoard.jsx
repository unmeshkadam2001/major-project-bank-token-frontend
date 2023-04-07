import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineCountertops } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("adminId")) {
      toast.error("Login as a admin first.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login/admin");
    }
  }, [navigate]);
  return (
    <>
      <section className="flex flex-col items-center w-full px-5 py-24 space-y-24 text-gray-600 body-font">
        <div className="flex flex-col w-full space-y-2 text-center">
          <h2 className="text-xs font-medium tracking-widest text-indigo-500 title-font">
            Admin Dashboard
          </h2>
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Manager of Apli bank
          </h1>
        </div>
        <div className="flex w-4/5 space-x-3">
          <Link
            to="/add/counter"
            className="flex items-center w-1/3 p-8 space-x-4 bg-gray-100 rounded-lg hover:shadow-lg"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 text-white bg-indigo-500 rounded-full">
              <MdOutlineCountertops className="text-xl" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 title-font">
              Add New Counter
            </h2>
            <div className="inline-flex items-center text-indigo-500 ">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </div>
          </Link>
          <Link
            to="/add/service"
            className="flex items-center w-1/3 p-8 space-x-4 bg-gray-100 rounded-lg hover:shadow-lg"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 text-white bg-indigo-500 rounded-full">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-900 title-font">
              Add Service
            </h2>
            <div className="inline-flex items-center text-indigo-500 ">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </div>
          </Link>
          <Link
            to="/admin/addcounterexecutive"
            className="flex items-center w-1/3 p-8 space-x-4 bg-gray-100 rounded-lg hover:shadow-lg"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 text-white bg-indigo-500 rounded-full">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-900 title-font">
              Add Counter Executive
            </h2>
            <div className="inline-flex items-center text-indigo-500 ">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
