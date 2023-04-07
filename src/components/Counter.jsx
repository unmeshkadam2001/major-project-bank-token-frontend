import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Counter = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [counters, setCounters] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [counterNo, setCounterNo] = useState(0);

  const [userTokens, setUserTokens] = useState([]);

  const [counterData, setCounterData] = useState([]);
  const [pendingQueue, setPendingQueue] = useState([]);

  useEffect(() => {
    //only navigation from all counters page allowed
    if (location.state === null) {
      navigate("/all-counter-panel");
    } else {
      setCounterNo(location.state.counterClicked);
    }
    //counter executive and manager not allowed here
    if (localStorage.getItem("counterid")) {
      navigate("/counter-executive");
    }

    if (localStorage.getItem("adminId")) {
      navigate("/admin/dashboard");
    }
  }, [navigate, location.state]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          `http://localhost:8080/gettokencounters?cid=${location.state.counterClicked}`
        )
        .then((response) => {
          setCounterData(response.data);
        });

      await axios
        .get("http://localhost:8080/get-counter")
        .then(function (response) {
          setCounters(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      await axios
        .get(
          `http://localhost:8080/getpendingqueue?counterid=${location.state.counterClicked}`
        )
        .then((response) => {
          setPendingQueue(response.data);
        });

      await axios
        .get("http://localhost:8080/get-all-sub-service")
        .then((response) => {
          setServiceTypes(response.data);
        });

      if (JSON.parse(localStorage.getItem("UserToken"))) {
        setUserTokens(JSON.parse(localStorage.getItem("UserToken")));
      } else {
        setUserTokens([]);
      }
    }
    fetchData();
  }, [location.state.counterClicked]);

  return (
    <div>
      <div className="flex flex-col w-full py-8 space-y-3 text-center">
        <h1 className="text-4xl font-bold text-gray-900 title-font">
          {counters[counterNo - 1] ? (
            <div>{counters[counterNo - 1].name.replace(/([A-Z])/g, " $1")}</div>
          ) : (
            <div>Counter {counterNo}</div>
          )}
        </h1>
        <div className="text-xl font-semibold">
          Current Token in service: {localStorage.getItem("activeToken")}
        </div>
      </div>
      <div className="flex w-full p-5 section">
        <div className="flex flex-col w-2/5 p-5 m-2 space-y-2 bg-gray-100">
          <span className="text-xl font-semibold">In queue</span>
          <table className="tokenqueue">
            <tbody>
              <tr>
                <td className="px-4 py-2 font-medium border">Token ID</td>
                <td className="px-4 py-2 font-medium border">Service Type</td>
                <td className="px-4 py-2 font-medium border">Times Called</td>
                <td className="px-4 py-2 font-medium border">Status</td>
              </tr>
              {counterData.map((filteredItem) => (
                <tr
                  key={filteredItem.id}
                  className={` ${
                    userTokens.includes(filteredItem.id)
                      ? "bg-green-300 hover:bg-green-400"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <td className="px-4 py-2 border">{filteredItem.id}</td>
                  <td className="px-4 py-2 border">
                    {serviceTypes[filteredItem.servicetypeId-1]
                      ? serviceTypes[
                          filteredItem.servicetypeId - 1
                        ].serviceName.replace(/([A-Z])/g, " $1")
                      : filteredItem.servicetypeId}
                  </td>
                  <td className="px-4 py-2 border">
                    {filteredItem.frequencyOfCalling}
                  </td>
                  <td className="px-4 py-2 border">{filteredItem.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col w-2/5 p-5 m-2 space-y-2 bg-gray-100">
          <span className="text-xl font-semibold">Pending queue</span>
          {pendingQueue.length > 0 && (
            <table className="tokenqueue">
              <tbody>
                <tr>
                  <td className="px-4 py-2 font-medium border">Token ID</td>
                  <td className="px-4 py-2 font-medium border">Service Type</td>
                  <td className="px-4 py-2 font-medium border">Times Called</td>
                  <td className="px-4 py-2 font-medium border">Status</td>
                </tr>
                {pendingQueue.map((filteredItem) => (
                  <tr
                    key={filteredItem.id}
                    className={`  ${
                      userTokens.includes(filteredItem.id)
                        ? "bg-green-300 hover:bg-green-400"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <td className="px-4 py-2 border">{filteredItem.id}</td>
                    <td className="px-4 py-2 border">
                      {serviceTypes[filteredItem.servicetypeId]
                        ? serviceTypes[
                            filteredItem.servicetypeId - 1
                          ].serviceName.replace(/([A-Z])/g, " $1")
                        : filteredItem.servicetypeId}
                    </td>
                    <td className="px-4 py-2 border">
                      {filteredItem.frequencyOfCalling}
                    </td>
                    <td className="px-4 py-2 border">{filteredItem.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex flex-col w-1/5 p-5 m-2 space-y-2 bg-gray-100">
          <span className="text-xl font-semibold">Your tokens</span>
          <table className="tokenqueue">
            <tbody>
              <tr>
                <td className="px-4 py-2 font-medium border">Token ID</td>
              </tr>
              {pendingQueue.map((item) => (
                <tr key={item.id}>
                  {userTokens.includes(item.id) && (
                    <td className="px-4 py-2 border">{item.id}</td>
                  )}
                </tr>
              ))}
              {counterData.map((item) => (
                <tr key={item.id}>
                  {userTokens.includes(item.id) && (
                    <td className="px-4 py-2 border">{item.id}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Counter;
