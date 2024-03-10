import React from "react";
import { Navigate } from "react-router-dom";
import { Flex } from "antd";

import { Login } from "./components/Login";

import auth from "../../services/auth.services";

import { homeSectionStruct } from "./struct";

import "./styles.css";

const Homepage = () => {
  if (auth.retriveToken() && auth.retriveToken() !== "undefined")
    return <Navigate to="/user/home" />;
  else {
    return (
      <>
        <div className="container">
          <div className="screen">
            <Flex {...homeSectionStruct}>
              <Login />

              <div className="screen__background">
                <span className="screen__background__shape screen__background__shape5"></span>
                <span className="screen__background__shape screen__background__shape4"></span>
                <span className="screen__background__shape screen__background__shape3"></span>
                <span className="screen__background__shape screen__background__shape2"></span>
                <span className="screen__background__shape screen__background__shape1"></span>
              </div>
            </Flex>
          </div>
        </div>
      </>
    );
  }
};

export default Homepage;
