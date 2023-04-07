import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,Link } from "react-router-dom";

const AddCounter = () => {
  const navigate = useNavigate();
  const [counterData, setcounterData] = useState("");
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [counterExecutives, setCounterExecutives] = useState([]);
  const [counterExecutiveName, setCounterExecutiveName] = useState("");

  const data = {
    counterName: counterData,
    serviceName: serviceName,
    counterExecutiveName: counterExecutiveName,
  };

  // Adding Counter
  function addCounter(event) {
    event.preventDefault();
    console.log(data);
    let url = `http://localhost:8080/add/counter`;
    axios.post(url, data).then((response) => {
      toast.success("Counter Added sucessfully!", {
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
  }

  // Getting Services for assigning to the counter
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
    let url = `http://localhost:8080/get/services`;
    axios
      .get(url)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  // Getting Counter Executive for assigning to the counter
  useEffect(() => {
    let url = `http://localhost:8080/get/counter/executive`;
    axios
      .get(url)
      .then((response) => {
        setCounterExecutives(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <section className="flex flex-col items-center w-full px-5 py-10 space-y-16 text-gray-600 body-font">
        <div className="flex flex-col w-full space-y-2 text-center">
          <h2 className="text-xs font-medium tracking-widest text-indigo-500 title-font">
            Admin Dashboard Of Adding Counter And Assigning Service To Counter
          </h2>
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Manager of Pratiti bank
          </h1>
        </div>

        {/* Adding Counter */}
        <div>
          <h1 className="pb-6 ml-48 font-medium text-gray-700 sm:text-2xl title-font">
            Add Counter
          </h1>
          <form className="items-center px-8 pt-4 pb-8 mb-4 bg-white border-2 border-gray-300 rounded shadow-md">
            <br />
            <pre className="text-lg ">
              Counter Name :{" "}
              <input
                type="text"
                name="name"
                value={counterData.name}
                onChange={(event) => setcounterData(event.target.value)}
                className="py-2 pl-4 leading-6 rounded-md shadow-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none w-80 text-md text-slate-900 placeholder-slate-400 ring-1 ring-slate-200"
                placeholder="Counter Name..."
              />
              <br />
              <br />
              {/* Assigning Service To Counter */}
              <div>
                <label className="block mt-3">Select a service</label>
                <select
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={serviceName}
                  onChange={(event) => setServiceName(event.target.value)}
                  required
                >
                  <option value=""> Select an option </option>
                  {services.map((service) => (
                    <option key={service.id} value={service.serviceName}>
                      {service.serviceName}
                    </option>
                  ))}
                </select>
              </div>
              {/* Assigning Counter Executive To Counter */}
              <div>
                <label className="block mt-10 mb-2">
                  Select a Counter Executive
                </label>
                <select
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={counterExecutiveName}
                  onChange={(event) =>
                    setCounterExecutiveName(event.target.value)
                  }
                  required
                >
                  <option value="">Select an option</option>
                  {counterExecutives.map((counterExecutive) => (
                    <option
                      key={counterExecutive.id}
                      value={counterExecutive.username}
                    >
                      {counterExecutive.username}
                    </option>
                  ))}
                </select>
              </div>
            </pre>
            <button
              type="submit"
              onClick={addCounter}
              className="h-10 px-6 mt-12 mb-2 ml-5 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-800"
            >
              Add Counter
            </button>
            <Link
            to="/admin/catchallcounter">
              <button
              type="submit"
              className="h-10 px-6 mt-12 font-semibold text-white bg-teal-600 rounded-md ml-14 hover:bg-teal-800"
            >
              Add Catch All Counter
            </button>
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};
export default AddCounter;
