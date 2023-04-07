import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineCountertops, MdGeneratingTokens } from "react-icons/md";
import { BsArrowRightShort } from "react-icons/bs";

const Home = () => {
  return (
    <>
      <section className="flex flex-col items-center w-full px-5 py-24 space-y-24 text-gray-600 body-font">
        <div className="flex flex-col w-full space-y-2 text-center">
          <h2 className="text-xs font-medium tracking-widest text-indigo-500 title-font">
            Services at your fingertips !
          </h2>
          <h1 className="text-2xl font-medium text-gray-900 sm:text-3xl title-font">
            Welcome To Apli bank Token System 
          </h1>
        </div>
        <div className="flex flex-col w-3/5 md:flex-row">
          <Link
            to="/customer-panel"
            className="flex items-center w-full p-8 m-2 space-x-2 bg-gray-100 rounded-lg md:space-x-4 md:w-1/2 hover:shadow-lg"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 text-white bg-indigo-500 rounded-full">
              <MdGeneratingTokens className="text-xl" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 title-font">
              Generate Token
            </h2>
            <div className="inline-flex items-center text-indigo-500 ">
              <BsArrowRightShort className="text-2xl" />
            </div>
          </Link>
          <Link
            to="/all-counter-panel"
            className="flex items-center w-full p-8 m-2 space-x-2 bg-gray-100 rounded-lg md:space-x-4 md:w-1/2 hover:shadow-lg"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 text-white bg-indigo-500 rounded-full">
              <MdOutlineCountertops className="text-xl" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 title-font">
              Counter Status
            </h2>
            <div className="inline-flex items-center text-indigo-500 ">
              <BsArrowRightShort className="text-2xl" />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
