import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'
import Weather from "./Components/Weather";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const success = (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const API_KEI = "953d1e78515e01e0e36783d533d11f89";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEI}`;

    axios
      .get(url)
      .then(({ data }) => setWeatherInfo(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);
  

  return (
    <>
      <main className='bg-[url("/public/img/bg.jpg")] min-h-screen bg-center bg-cover text-white font-lato  flex  justify-center   items-center  px-4 '>
        <Weather weatherInfo={weatherInfo} setWeatherInfo={setWeatherInfo} />
      </main>
    </>
  )
}

export default App
