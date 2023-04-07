import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddServices = () => {
  const [servicetypes, setServicetypes] = useState([{ serviceName: "" }]);
  const [serviceName, setServiceName] = useState("");
  const [ValidationError, setValidationError] = useState([]);

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

  const servicetypeInput = (index, event) => {
    const updatedservicetype = [...servicetypes];
    updatedservicetype[index].serviceName = event.target.value;
    setServicetypes(updatedservicetype);
  };

  //   Adding a type of service
  const handleAddservicetype = () => {
    setServicetypes([...servicetypes, { serviceName: "" }]);
  };

  //   Removing a type of service
  const handleRemoveservicetype = (index) => {
    const updatedservicetype = [...servicetypes];
    updatedservicetype.splice(index, 1);
    setServicetypes(updatedservicetype);
  };

  // Add/Submit of type of service
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      serviceName: serviceName.replace(" ", ""),
      servicetypes: servicetypes
        .map((e) => {
          return { serviceName: e.serviceName.trim().replace(" ", "") };
        })
        .filter((e) => e.serviceName !== ""),
    };

    const errors = [];
    for (let i = 0; i < servicetypes.length; ++i) {
      const servicetype = servicetypes[i];
      if (!servicetype.serviceName) {
        errors.push(`Service ${i + 1} name is required`);
      }
    }
    if (errors.length > 0) {
      setValidationError(errors);
      return;
    }
    console.log(data);
    if (data.servicetypes.length === 0) {
      toast.warning("Service type cant be empty.", {
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
      setValidationError([]);
      let url = `http://localhost:8080/add/service`;
      await axios.post(url, data).then((response) => {
        toast.success(response.data, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
      setServiceName("");
      setServicetypes([{ serviceName: "" }]);
    }
  };

  return (
    <section className="flex flex-col items-center w-full px-5 py-10 space-y-24 text-gray-600 body-font">
      <div className="flex flex-col w-full space-y-2 text-center">
        <h2 className="text-xs font-medium tracking-widest text-indigo-500 title-font">
          Admin Dashboard Of Adding Service And It's Type
        </h2>
        <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
          Manager of Apli bank
        </h1>
      </div>
      <div className="w-full max-w-md">
        <h1 className="items-center pb-8 pl-20 font-medium text-gray-700 sm:text-2xl title-font">
          Add Service And It's Types
        </h1>
        <form
          onSubmit={handleSubmit}
          className="items-center px-8 pb-10 mb-4 bg-white border-2 border-gray-300 rounded shadow-md pt-7"
        >
          <div className="mb-6 border-b-2 border-neutral-400 ">
            <label className="block pr-4 mb-1 font-medium text-gray-600 md:text-left md:mb-0">
              Service Name :{" "}
              <input
                className="w-full px-4 py-2 mt-2 mb-6 leading-tight text-gray-700 border-2 border-gray-300 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                type="text"
                value={serviceName}
                onChange={(event) => setServiceName(event.target.value)}
              />
            </label>
          </div>
          {servicetypes.map((servicetype, index) => (
            <div key={index} className="mb-6">
              <label className="block pr-4 mb-1 font-medium text-gray-600 md:text-left md:mb-0">
                Type Of Service {index + 1} :
                <input
                  className="w-full px-4 py-2 mt-2 leading-tight text-gray-700 border-2 border-gray-300 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                  type="text"
                  value={servicetype.serviceName}
                  onChange={(event) => servicetypeInput(index, event)}
                />
              </label>
              {ValidationError.length > 0 && !servicetype.serviceName && (
                <p style={{ color: "red" }}>Type Of Service Name Is Required</p>
              )}
              <button
                className="px-4 py-2 mt-5 mb-6 font-medium text-white bg-red-500 rounded shadow-lg w-60 hover:bg-red-700 focus:shadow-outline focus:outline-none"
                type="button"
                onClick={() => handleRemoveservicetype(index)}
              >
                Remove Service Type
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddservicetype}
            className="px-4 py-2 font-medium text-white bg-teal-600 rounded shadow-lg w-60 hover:bg-teal-800 focus:shadow-outline focus:outline-none"
          >
            Add Type Of Service
          </button>
          <button
            type="submit"
            className="px-4 py-2 mt-6 ml-12 font-bold text-white rounded shadow-lg w-30 bg-sky-600 hover:bg-sky-800 focus:shadow-outline focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddServices;
