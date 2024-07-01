"use client";

import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import defaultStates from "../utils/defaultStates";
import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [dailyWeather, setDailyWeather] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [dailyForecast, setDailyForecast] = useState({});

  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");

  const [activeCityCoords, setActiveCityCoords] = useState([
    51.752021, -1.257726,
  ]);

  const getDailyWeather = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
      setDailyWeather(res.data);
    } catch (error) {
      console.log("Error fetching daily weather data: ", error.message);
    }
  };

  const getAirQuality = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/air-quality?lat=${lat}&lon=${lon}`);
      setAirQuality(res.data);
    } catch (error) {
      console.log("Error fetching air pollution data: ", error.message);
    }
  };

  const getDailyForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/daily-forecast?lat=${lat}&lon=${lon}`);
      setDailyForecast(res.data);
    } catch (error) {
      console.log("Error fetching daily forecast data: ", error.message);
    }
  };

  const getGeoCodedList = async (search) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`);
      setGeoCodedList(res.data);
    } catch (error) {
      console.log("Error fetching geocoded list: ", error.message);
    }
  };

  // handle input
  const handleInput = (e) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      setGeoCodedList(defaultStates);
    }
  };

  // debounce function
  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      getGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }
    // cleanup
    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    getDailyWeather(activeCityCoords[0], activeCityCoords[1]);
    getAirQuality(activeCityCoords[0], activeCityCoords[1]);
    getDailyForecast(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        dailyWeather,
        airQuality,
        dailyForecast,
        geoCodedList,
        inputValue,
        handleInput,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          setActiveCityCoords,
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
