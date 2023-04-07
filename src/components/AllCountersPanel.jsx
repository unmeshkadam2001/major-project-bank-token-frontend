import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AllCountersPanel = () => {
  const [queueMap, setQueueMap] = useState({});
  const [pendingQueueMap, setPendingQueueMap] = useState({});
  const [userTokens, setUserTokens] = useState([]);
  const [userTokenData, setUserTokenData] = useState([]);
  const [counters, setCounters] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      //counter executive not allowed on this screen
      if (localStorage.getItem("counterid")) {
        navigate("/counter-executive");
      }
      // manager not allowed on this screen
      if (localStorage.getItem("adminId")) {
        navigate("/admin/dashboard");
      }

      //get queuemap
      await axios
        .get("http://localhost:8080/gettokenmap")
        .then(function (response) {
          setQueueMap(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      // let isMapEmpty = true;
      //   Object.keys(response.data).map((counterNo) => {
      //     if (response.data[counterNo].length > 0) {
      //       isMapEmpty = false;
      //     }
      //   });
      //   if (isMapEmpty) {
      //     localStorage.removeItem("UserToken");
      //   }

      if (JSON.parse(localStorage.getItem("UserToken"))) {
        setUserTokens(JSON.parse(localStorage.getItem("UserToken")));
      } else {
        setUserTokens([]);
      }

      await axios
        .get("http://localhost:8080/get-counter")
        .then(function (response) {
          setCounters(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      await axios
        .get("http://localhost:8080/get-services")
        .then(function (response) {
          setServices(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      await axios
        .get("http://localhost:8080/get-all-sub-service")
        .then((response) => {
          setServiceTypes(response.data);
        });
    }
    fetchData();
  }, [navigate]);

  useEffect(() => {
    let temp = [];
    userTokens.map(async (id) => {
      return await axios
        .get(`http://localhost:8080/get-token-info?id=${id}`)
        .then(function (response) {
          if (response.data.id !== 0) {
            temp.push(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    setUserTokenData(temp);
  }, [userTokens]);

  console.log("user token data");
  console.log(userTokenData);
  
  return (
    <section className="flex flex-col w-full px-5 py-10 text-gray-600 body-font md:flex-row ">
      <div className="flex flex-wrap w-full md:w-2/3 h-max">
        {Object.keys(queueMap).map((eachCounterNo) => {
          return (
            <div
              className="p-3 cursor-pointer lg:w-1/3 h-max"
              key={eachCounterNo}
            >
              {queueMap[eachCounterNo].length > 0 && (
                <div
                  key={eachCounterNo}
                  onClick={() => {
                    navigate("/counter", {
                      state: { counterClicked: eachCounterNo },
                    });
                  }}
                >
                  <div className="relative h-full p-6 overflow-hidden text-center bg-gray-100 bg-opacity-75 rounded-lg hover:shadow-lg">
                    <h1 className="mb-3 text-xl font-medium text-gray-900 title-font sm:text-2xl">
                      {counters[eachCounterNo - 1] ? (
                        <div>
                          {counters[eachCounterNo - 1].name.replace(
                            /([A-Z])/g,
                            " $1"
                          )}
                        </div>
                      ) : (
                        <div>Counter {eachCounterNo}</div>
                      )}
                    </h1>
                    <div className="mb-3 leading-relaxed">
                      {services[eachCounterNo - 2] ? (
                        <div>
                          {services[eachCounterNo - 2].serviceName.replace(
                            /([A-Z])/g,
                            " $1"
                          )}
                        </div>
                      ) : (
                        <div>Service {eachCounterNo}</div>
                      )}
                    </div>
                    <span className="inline-flex items-center mb-3 text-indigo-500">
                      {queueMap[eachCounterNo].length} waiting
                    </span>
                    <div className="flex flex-col w-full tokens">
                      <div className="flex items-center p-2 m-2 bg-gray-200 rounded token">
                        Queue:
                        {queueMap[eachCounterNo].map((eachToken) => {
                          return (
                            <span className="mx-1" key={eachToken.id}>
                              {eachToken.id}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="w-1/3 p-5 tokendetails">
        <div className="p-5 bg-gray-100 rounded hover:shadow-lg">
          <span className="text-xl font-semibold">Your token Details</span>
          {userTokenData.length === 0 ? (
            <div className="flex flex-col">
              <span className="py-3">You have availed 0 services</span>
              <Link
                to="/customer-panel"
                className="px-4 py-2 text-white bg-indigo-500 rounded w-max"
              >
                click to see available services
              </Link>
            </div>
          ) : (
            <div>
              {userTokenData.map((e) => {
                return (
                  <div className="flex flex-col py-3 token" key={e.id}>
                    <span>
                      Token Id: <span className="font-semibold"> {e.id}</span>
                    </span>
                    <span>
                      Generation Time:
                      <span className="font-semibold"> {e.generationTime}</span>
                    </span>
                    <span>
                      Expected time:{" "}
                      <span className="font-semibold">{e.expectedTime}</span>
                    </span>
                    <span>
                      Frequency of calling:
                      <span className="font-semibold">
                        {" "}
                        {e.frequencyOfCalling}
                      </span>
                    </span>
                    <span>
                      Service Type:{" "}
                      <span className="font-semibold">
                        {serviceTypes[e.servicetypeId-1] &&
                          serviceTypes[e.servicetypeId - 1].serviceName.replace(
                            /([A-Z])/g,
                            " $1"
                          )}
                      </span>
                    </span>
                    <span>
                      Status: <span className="font-semibold">{e.status}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllCountersPanel;
