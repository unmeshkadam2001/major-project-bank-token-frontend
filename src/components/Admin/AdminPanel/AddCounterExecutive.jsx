import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { json, useNavigate } from "react-router-dom";

const AddCounterExecutive = () => {
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
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const submit = () => {
    if (userData.password.includes(" ")) {
      toast.warning("No space allowed in password or username", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const jsonData = JSON.stringify(userData);
      axios
        .post("http://localhost:8080/addcounterexecutive", jsonData, {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.status) {
            toast.success(response.data.messsageIfAny, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            toast.warning(response.data.messsageIfAny, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        });
      setUserData({
        username: "",
        password: "",
      });
    }
  };

  return (
    <section className="">
      <div className="flex flex-col items-center px-6 py-12 mx-auto lg:py-24">
        <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="w-full text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl ">
              Add Counter Executive
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="JhonDoe"
                  required
                  value={userData.username}
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, username: e.target.value };
                    });
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                  autoComplete="on"
                  value={userData.password}
                  onChange={(e) => {
                    setUserData((prevData) => {
                      return { ...prevData, password: e.target.value };
                    });
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Add Counter Executive
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddCounterExecutive;
