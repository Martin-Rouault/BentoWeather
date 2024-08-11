"use client";

import axios from "axios";
import React, { useContext, createContext, useState, useEffect } from "react";
import { debounce } from "lodash";
import { toast } from "sonner";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

const getCityFromLocalStorage = () => {
  const savedCities = JSON.parse(localStorage.getItem("savedCities") || "[]");
  return savedCities;
};

export const GlobalContextProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [city, setCity] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(getCityFromLocalStorage());
  const [inputValue, setInputValue] = useState("");
  const [activeCityCoords, setActiveCityCoords] = useState([
    51.752021, -1.257726,
  ]);

  const getCurrentWeather = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
      setCurrentWeather(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error fetching daily weather data: ", error.message);
    }
  };

  const getCurrentCity = async (lat, lon) => {
    try {
      const res = await axios.get(`/api/city?lat=${lat}&lon=${lon}`);
      setCity(res.data);
    } catch (error) {
      console.log("Error fetching city name: ", error.message);
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
      setGeoCodedList(getCityFromLocalStorage());
    }
  };

  const saveCity = (name, lat, lon) => {
    const savedCities = JSON.parse(localStorage.getItem("savedCities") || "[]");

    if (savedCities.length >= 5) {
      toast.warning("You can only save up to 5 cities", {
        position: "top-center",
      });
      return;
    } else if (savedCities.some((city) => city.name === name)) {
      toast.warning("City already saved", { position: "top-center" });
      return;
    }

    const newCity = { name, lat, lon };
    const newSavedCities = [...savedCities, newCity];
    localStorage.setItem("savedCities", JSON.stringify(newSavedCities));
    console.log(localStorage);
    setGeoCodedList(newSavedCities);
    toast.success("City saved successfully", { position: "top-center" });
  };

  const removeCityFromLocalStorage = (name) => {
    const savedCities = JSON.parse(localStorage.getItem("savedCities") || "[]");
    const newSavedCities = savedCities.filter((city) => city.name !== name);
    localStorage.setItem("savedCities", JSON.stringify(newSavedCities));
    setGeoCodedList(newSavedCities);
    toast.success("City removed successfully", { position: "top-center" });
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
    getCurrentWeather(activeCityCoords[0], activeCityCoords[1]);
    getAirQuality(activeCityCoords[0], activeCityCoords[1]);
    getCurrentCity(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        currentWeather,
        city,
        airQuality,
        geoCodedList,
        inputValue,
        handleInput,
        saveCity,
        removeCityFromLocalStorage,
        getCityFromLocalStorage,
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
