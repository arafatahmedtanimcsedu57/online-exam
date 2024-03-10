import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

import store from "./store";

import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";

import TraineeRegistration from "./components/trainee/TraineeRegistration";
import MainPortal from "./components/trainee/ExamPortal";

import "./global.css";
import "./App.less";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const handleClick = () => setIsDarkMode((previousValue) => !previousValue);

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          token: {
            colorPrimary: "#5a5ab5",
            colorFillSecondary: "#d49bdd",
            colorTextSecondary: "#812990",
            colorError: "#ff8399",
            colorWarning: "#f6941c",
            fontFamily: '"Roboto Slab", serif',
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/home" element={<Homepage />} />
            <Route
              exact
              path="/user"
              element={
                <Dashboard isDarkMode={isDarkMode} handleTheme={handleClick} />
              }
            />
            <Route
              path="/user/:options"
              element={
                <Dashboard isDarkMode={isDarkMode} handleTheme={handleClick} />
              }
            />
            <Route
              exact
              path="/trainee/register"
              element={<TraineeRegistration />}
            />
            <Route exact path="/trainee/taketest" element={<MainPortal />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
