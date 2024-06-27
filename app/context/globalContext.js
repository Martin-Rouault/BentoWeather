"use client";

import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [dailyWeather, setDailyWeather] = useState({});
  const [airQuality, setAirQuality] = useState({});

  const getDailyWeather = async () => {
    try {
      const res = await axios.get("/api/weather");
      setDailyWeather(res.data);
    } catch (error) {
      console.log("Error fetching daily weather data: ", error.message);
    }
  };

  const getAirQuality = async () => {
    try {
      const res = await axios.get("/api/air-quality");
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching air pollution data: ", error.message);
    }
  };

  useEffect(() => {
    getDailyWeather();
    getAirQuality();
  }, []);

  return (
    <GlobalContext.Provider value={{ dailyWeather, airQuality }}>
      <GlobalContextUpdate.Provider>{children}</GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
