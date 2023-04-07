import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerPanel = () => {
  const navigate = useNavigate();

  const [selectedService, setSelectedService] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [fetchedServices, setFetchedServices] = useState([]);
  const [fetchedServiceDetails, setFetchedServiceDetails] = useState({});

  useEffect(() => {
    if (localStorage.getItem("counterid")) {
      navigate("/counter-executive");
    }

    if (localStorage.getItem("adminId")) {
      navigate("/admin/dashboard");
    }

    axios
      .get("http://localhost:8080/get-services")
      .then(function (response) {
        setFetchedServices(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [navigate]);

  useEffect(() => {
    fetchedServices.map(async (eachService) => {
      return await axios
        .get(`http://localhost:8080/get-sub-service?sid=${eachService.id}`)
        .then(function (response) {
          setFetchedServiceDetails((prev) => {
            return {
              ...prev,
              [eachService.serviceName]: response.data,
            };
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }, [fetchedServices]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOptions.length === 0) {
      console.log("Select at least 1 service");
    } else {
      let queueLength;
      await axios
        .get("http://localhost:8080/gettokenmap")
        .then(function (response) {
          queueLength = Object.keys(response.data).length;
        })
        .catch(function (error) {
          console.log(error);
        });

      await axios
        .post("http://localhost:8080/addtoken", {
          service: selectedService,
          subServices: selectedOptions,
        })
        .then(function (response) {
          let userToken = [];
          response.data.map((e) => {
            return userToken.push(e.id);
          });

          if (queueLength === 0) {
            localStorage.setItem("UserToken", JSON.stringify(userToken));
          } else {
            if (JSON.parse(localStorage.getItem("UserToken"))) {
              localStorage.setItem(
                "UserToken",
                JSON.stringify(
                  JSON.parse(localStorage.getItem("UserToken")).concat(
                    userToken
                  )
                )
              );
            } else {
              localStorage.setItem("UserToken", JSON.stringify(userToken));
            }
          }
          toast.success("Token Generated", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // navigate("/all-counter-panel");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    setSelectedOptions([]);
  };

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter(
          (selectedOption) => selectedOption !== option
        );
      } else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  return (
    <>
      <div className="flex flex-col text-center w-full space-y-2 py-16">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font">
          something here
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Pick Any service to generate Token
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-[30rem] justify-between"
      >
        <div className="w-full flex flex-wrap justify-around p-5">
          {fetchedServices.length > 0 ? (
            fetchedServices.map((service) => (
              <div
                key={service.id}
                className="w-full md:w-5/12j lg:w-1/6 bg-gray-100 flex rounded flex-col shadow hover:shadow-lg h-max m-2"
              >
                <label className="flex items-center justify-between p-4">
                  {service.serviceName.replace(/([A-Z])/g, " $1")}
                  <input
                    type="radio"
                    name="service"
                    value={service.serviceName}
                    checked={selectedService === service.serviceName}
                    onChange={handleServiceChange}
                  />
                </label>
                {selectedService === service.serviceName && (
                  <div className="flex-col bg-gray-200">
                    {fetchedServiceDetails[service.serviceName] ? (
                      fetchedServiceDetails[service.serviceName].map(
                        (option) => (
                          <div
                            key={option.id}
                            className="hover:bg-gray-300 p-3"
                          >
                            <label className="flex w-full space-x-5">
                              <input
                                type="checkbox"
                                name="option"
                                value={option.serviceName}
                                checked={selectedOptions.includes(
                                  option.serviceName
                                )}
                                onChange={handleOptionChange}
                              />
                              <span className="">
                                {option.serviceName.replace(/([A-Z])/g, " $1")}
                              </span>
                            </label>
                          </div>
                        )
                      )
                    ) : (
                      <div>
                        unable to fetch sub services. Try refreshing page or
                        check your connection
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>
              Unable to fetch services. Try refreshing page or check your
              connection
            </div>
          )}
        </div>
        <div className="flex justify-center w-full pb-8">
          <button
            className="text-xl bg-indigo-500 hover:bg-indigo-600 text-white w-max py-2 px-6 rounded-md"
            type="submit"
          >
            Generate token
          </button>
        </div>
      </form>
    </>
  );
};

export default CustomerPanel;
