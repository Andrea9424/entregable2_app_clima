import React, { useState } from "react";
import axios from "axios";

const Weather = ({ weatherInfo, setWeatherInfo }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const kelvinToCelsius = (tempKelvin) => {
    return (tempKelvin - 273.15).toFixed(1);
  };

  const kelvinToFahrenheit = (tempKelvin) => {
    return (((tempKelvin - 273.15) * 9) / 5 + 32).toFixed(1);
  };

  const handleChangeTemp = () => {
    setIsCelsius(!isCelsius);
  };

  const convert = isCelsius
    ? kelvinToCelsius(weatherInfo?.main.temp)
    : kelvinToFahrenheit(weatherInfo?.main.temp);

  const handleSubmit = (e) => {
    e.preventDefault();
    const look = e.target.look.value;
    const API_key = "953d1e78515e01e0e36783d533d11f89";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${look}&appid=${API_key}`;

    axios
      .get(url)
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <section className="text-center">
      <form
        onSubmit={handleSubmit}
        className=" flex rounded-md overflow-hidden max-w-max mx-auto"
      >
        <input id="look" className="text-black p-2" type="text" />
        <button className="bg-white/30 px-4 text-black">search</button>
      </form>

      <h2>{weatherInfo?.name} </h2>

      <section className="grid gap-4 sm:grid-cols-[auto_auto] ">
        {/*seccion superior */}
        <section className="bg-white/30 p-2 rounded-2xl grid grid-cols-2 items-center">
          <h4 className="col-span-2">{weatherInfo?.weather[0].description}</h4>
          <span className="text-4xl">
            {convert}°{isCelsius ? "C" : "F"}{" "}
          </span>
          <div>
            <img
              src={
                weatherInfo &&
                `https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@4x.png`
              }
              alt=""
            />
          </div>
        </section>

        <section className="bg-white/30 p-1 py-4 rounded-2xl grid grid-cols-3 items-center sm:grid-cols-1 ">
          <article className="flex gap-2 items-center">
            <div className="w-[18px]">
              <img src={"/img/mdi_weather-windy.png"} alt="" />
            </div>
            <span>{weatherInfo?.wind.speed}m/s </span>
          </article>
          <article className="flex gap-2 items-center">
            <div className="w-[18px]">
              <img src={"/img/uil_raindrops-alt.png"} alt="" />
            </div>
            <span>{weatherInfo?.main.humidity}% </span>
          </article>
          <article className="flex gap-2 items-center">
            <div className="w-[18px]">
              <img src={"/img/tabler_arrow-wave-right-down.png"} alt="" />
            </div>
            <span>{weatherInfo?.main.pressure}hPa </span>
          </article>
        </section>
      </section>
      <button
        onClick={handleChangeTemp}
        className="mt-4 text-center rounded-full p-2 bg-white/30 text-black"
      >
        Cambiar a F°
      </button>
    </section>
  );
};

export default Weather;
