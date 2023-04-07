import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const AddCatchAll=()=>{
    const [counterExecutives, setCounterExecutives] = useState([]);
    const [counterExecutiveName, setCounterExecutiveName] = useState("");

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

  const data={
    counterName: "CatchAll",
    counterExecutiveName: counterExecutiveName,
  };
  
  const addCounter=(event)=>{
    event.preventDefault();
    console.log(data);
    let url = `http://localhost:8080/add/catchallcounter`;
    axios.post(url, data).then((response) => {
      if(response.data.status){
        toast.success(response.data.messsageIfAny, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
      }
      else{
        toast.error(response.data.messsageIfAny, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
      }
    }
    )
  }
    
    return(
        <>
        <section className="flex flex-col items-center w-full px-5 py-10 space-y-16 text-gray-600 body-font">
        <div className="flex flex-col w-full space-y-2 text-center">
          <h2 className="text-xs font-medium tracking-widest text-indigo-500 title-font">
            Admin Dashboard Of Adding Catch All Counter 
          </h2>
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Manager of pratiti bank
          </h1>
        </div>

        {/* Adding Counter */}
        <div>
          <h1 className="pb-6 ml-48 font-medium text-gray-700 sm:text-2xl title-font">
            Add Counter
          </h1>
          <form className="items-center px-8 pt-4 pb-10 mb-4 bg-white border-2 border-gray-300 rounded shadow-md">
            <br />
            <pre className="text-lg ">
              Counter Name :{" "}
              <input
                type="text"
                name="name"
                value="CatchAll"
                className="py-2 pl-4 leading-6 rounded-md shadow-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none w-80 text-md text-slate-900 placeholder-slate-400 ring-1 ring-slate-200"
                placeholder="Catch All"
              />
              <br />
              <br />

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
              className="h-10 px-6 mt-12 mb-2 ml-4 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-800"
            >
              Add Counter
            </button>
          </form>
        </div>
      </section>
        </>
    );
}


export default AddCatchAll;