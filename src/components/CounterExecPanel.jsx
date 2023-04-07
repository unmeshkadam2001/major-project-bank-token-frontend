import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CounterExecPanel = () => {
  const [counterData, setCounterData] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [pendingQueue, setPendingQueue] = useState([]);
  const [activeToken, setActiveToken] = useState({});
  const [counterName,setCounterName]= useState("");
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  
  //fetch data for queue and pending queue
  const fetchData = async () => {
    if (counterName==="CatchAll") {
      await axios.get(`http://localhost:8080/gettokenmap`).then((response) => {
        let temp = response.data;
        let allTokens = [];
        Object.keys(temp).map((e) => {
          allTokens = allTokens.concat(temp[e]);
        });
        setCounterData(allTokens);
      });
    } else {
      await axios
      .get(
        `http://localhost:8080/gettokencounters?cid=${JSON.parse(
          localStorage.getItem("counterid")
        )}`
      )
      .then((response) => {
        setCounterData(response.data);
      });
    }
    await axios
      .get(
        `http://localhost:8080/getpendingqueue?counterid=${JSON.parse(
          localStorage.getItem("counterid")
        )}`
      )
      .then((response) => {
        setPendingQueue(response.data);
      });

    if (localStorage.getItem("activeToken")) {
      await axios
        .get(
          `http://localhost:8080/get-token-info?id=${JSON.parse(
            localStorage.getItem("activeToken")
          )}`
        )
        .then((response) => {
          setActiveToken(response.data);
        });
    } else {
      setActiveToken({});
    }
  };

  useEffect(() => {
    //no admin allowed
    if (localStorage.getItem("adminId")) {
      navigate("/admin/dashboard");
    }
    //if counter not logged
    if (!localStorage.getItem("counterid")) {
      toast.error("Please login as a Counter Executive First", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login/counter-executive");
    }

    //fetch all service type names just to display it.
    axios.get("http://localhost:8080/get-all-sub-service").then((response) => {
      setServiceTypes(response.data);
    });
    
    let getCounterName=`http://localhost:8080/get-counter-name?counterid=${JSON.parse(localStorage.getItem("counterid"))}`;
    
    axios
      .get(getCounterName)
      .then((response) => {
        setCounterName(response.data);
      });
    
    //fetch queue and pending queue
    
  }, [navigate]);

  useEffect(()=>{
    fetchData();
  },[counterName])

 

  const callNext = () => {
    if (counterData.length > 0) {
      if (localStorage.getItem("activeToken")) {
        toast.warning("Serve the active token first!", {
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
        if (count === 3 && pendingQueue.length !== 0) {
          setCount(0);
          axios
            .get(
              `http://localhost:8080/make-token-active?tokenId=${pendingQueue[0].id}&cId=${localStorage.getItem("counterid")}`
            )
            .then(async (response) => {
              if (response.data) {
                localStorage.setItem("activeToken", pendingQueue[0].id);
                  toast.success("Next customer Called.", {
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
                toast.success("Some error.", {
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
              fetchData();
            });
        } else {
          axios
            .get(
              `http://localhost:8080/make-token-active?tokenId=${counterData[0].id}&cId=${localStorage.getItem("counterid")}`
            )
            .then(async (response) => {
              if (response.data) {
                localStorage.setItem("activeToken", counterData[0].id);
                await fetchData();
                toast.success("Next customer Called.", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                setCount(count + 1);
                if (counterData.length === 1) {
                  await axios
                    .get(
                      `http://localhost:8080/copy-pendingqueue-to-counterqueue?counterid=${JSON.parse(
                        localStorage.getItem("counterid")
                      )}`
                    )
                    .then((response) => {
                      fetchData();
                    });
                  setCount(0);
                }
              } else {
                toast.success("Some error.", {
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
        }
      }
    } else {
      toast.warning("No tokens in the queues", {
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
  };

  const Serve = async () => {
    if (localStorage.getItem("activeToken")) {
      await axios
        .get(
          `http://localhost:8080/serve-token?tokenId=${localStorage.getItem(
            "activeToken"
          )}`
        )
        .then((response) => {
          if (response.data) {
            toast.success("Customer Served!", {
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
          localStorage.removeItem("activeToken");
          fetchData();
        });
    } else {
      toast.error("Please call the customer first !", {
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

    let url = `http://localhost:8080/getpendingqueue?counterid=${JSON.parse(
      localStorage.getItem("counterid")
    )}`;
    axios.get(url).then((response) => {
      setPendingQueue(response.data);
    });
  };

  const addToPending = async () => {
    if (localStorage.getItem("activeToken")) {
      await axios
        .get(
          `http://localhost:8080/addtoken-to-pending?tokenId=${localStorage.getItem(
            "activeToken"
          )}&cId=${localStorage.getItem("counterid")}`
        )
        .then((response) => {
          if (response.data) {
            toast.warning("Sent to Pending queue", {
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
            toast.warning("Abandoned", {
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
          localStorage.removeItem("activeToken");
          fetchData();
        });

      if (counterData.length === 0) {
        await axios
          .get(
            `http://localhost:8080/copy-pendingqueue-to-counterqueue?counterid=${JSON.parse(
              localStorage.getItem("counterid")
            )}`
          )
          .then((response) => {
            fetchData();
          });
        setCount(0);
      }
    } else {
      toast.error("Please call the customer first !", {
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
  };

  return (
    <section>
      <div className="w-full text-3xl font-semibold text-center py-9">
        Counter Executive
      </div>
      <div className="flex flex-wrap justify-center w-full">
        <div className="flex flex-col w-full px-4 py-8 m-2 space-y-6 bg-gray-100 rounded-lg h-max lg:w-1/3 hover:shadow">
          <div className="flex flex-col w-full space-y-5 text-center">
            <span className="text-2xl font-semibold">Current service</span>
            <div className="flex justify-center w-full space-x-3 btns">
              <button
                type="button"
                className="px-4 py-2 font-medium transition border border-gray-500 rounded-lg hover:bg-gray-700 w-max hover:text-white"
                onClick={() => {
                  callNext();
                }}
              >
                Call Next
              </button>
              <button
                type="button"
                onClick={() => {
                  addToPending();
                }}
                className="px-4 py-2 font-medium transition border border-gray-500 rounded-lg hover:bg-yellow-500 w-max hover:text-white"
              >
                Move to Pending
              </button>

              <button
                type="button"
                onClick={() => {
                  Serve();
                }}
                className="px-4 py-2 font-medium transition border border-gray-500 rounded-lg hover:bg-green-500 w-max hover:text-white"
              >
                Serve
              </button>
            </div>
          </div>
          {localStorage.getItem("activeToken") ? (
            <table className="text-center">
              <thead>
                <tr className="bg-gray-300 border border-gray-300">
                  <th className="px-4 py-2">Id</th>
                  <th className="px-4 py-2">Type of service</th>
                  <th className="px-4 py-2">Times Called</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={activeToken.id}
                  className="bg-gray-200 border border-gray-300"
                >
                  <td className="px-4 py-2 border-r-2 border-gray-300">
                    {activeToken.id}
                  </td>
                  <td className="px-4 py-2 border-r-2 border-gray-300">
                    {serviceTypes[activeToken.servicetypeId]
                      ? serviceTypes[
                          activeToken.servicetypeId - 1
                        ].serviceName.replace(/([A-Z])/g, " $1")
                      : activeToken.servicetypeId}
                  </td>
                  <td className="px-4 py-2 border-r-2 border-gray-300">
                    {activeToken.frequencyOfCalling}
                  </td>
                  <td className="px-4 py-2">{activeToken.status}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <span className="w-full text-center">No active token</span>
          )}
        </div>
        <div className="flex flex-col items-center w-full px-4 py-8 m-2 space-y-6 bg-gray-100 rounded-lg h-max md:w-1/2 lg:w-1/4 hover:shadow">
          <span className="w-full text-2xl font-semibold text-center">
            Customer List
          </span>
          {counterData.length === 0 ? (
            <span>No token generated</span>
          ) : (
            <table className="w-4/5 text-center">
              <thead>
                <tr className="bg-gray-300 border border-gray-300">
                  <th className="px-4 py-2">Id</th>
                  <th className="px-4 py-2">Service Type</th>
                </tr>
              </thead>
              <tbody>
                {counterData.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-gray-200 border border-gray-300 "
                  >
                    <td className="px-4 py-2 border-r-2 border-gray-300">
                      {item.id}
                    </td>
                    <td className="px-4 py-2 ">
                      {serviceTypes[item.servicetypeId-1]
                        ? serviceTypes[
                            item.servicetypeId - 1
                          ].serviceName.replace(/([A-Z])/g, " $1")
                        : item.servicetypeId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex flex-col items-center w-full px-4 py-8 m-2 space-y-6 bg-gray-100 rounded-lg h-max md:w-1/2 lg:w-1/4 hover:shadow">
          <span className="w-full text-2xl font-semibold text-center">
            Pending List
          </span>

          {pendingQueue.length === 0 ? (
            <span className="w-full text-center">No token here</span>
          ) : (
            <table className="w-4/5 text-center">
              <thead>
                <tr className="bg-gray-300 border border-gray-300">
                  <th className="px-4 py-2">Id</th>
                  <th className="px-4 py-2">Service Type</th>
                </tr>
              </thead>
              <tbody>
                {pendingQueue.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-gray-200 border border-gray-300 "
                  >
                    <td className="px-4 py-2 border-r-2 border-gray-300">
                      {item.id}
                    </td>
                    <td className="px-4 py-2 ">
                      {serviceTypes[item.servicetypeId-1]
                        ? serviceTypes[
                            item.servicetypeId - 1
                          ].serviceName.replace(/([A-Z])/g, " $1")
                        : item.servicetypeId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
};

export default CounterExecPanel;
