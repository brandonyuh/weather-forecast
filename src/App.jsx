import "./App.scss";
import axios from "axios";
import { useState, useEffect } from "react";
function App() {
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    axios.get(`https://api.weatherbit.io/v2.0/forecast/hourly?key=${process.env.REACT_APP_WEATHERBIT_KEY}&city=Vancouver&country=CA`).then((response) => {
      setHourlyData(response.data.data);
    });
    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHERBIT_KEY}&city=Vancouver&country=CA`).then((response) => {
      setDailyData(response.data.data);
    });

    return () => {};
  }, []);

  const getWeekDay = (date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date(date).getDay()];
  };

  const celsiusToFahrenheit = (celsius) => {
    return Math.round((celsius * 9) / 5 + 32);
  };

  return (
    <div className="App">
      <div>
        <h1>Vancouver Hourly</h1>
        <ul>
          {hourlyData.map((hour) => {
            return (
              <li className="weather__box">
                <p>{new Date(hour.timestamp_local).toLocaleTimeString()}</p>
                <p>
                  {Math.round(hour.temp)}°C | {celsiusToFahrenheit(hour.temp)}°F
                </p>
                <p>Pop: {hour.pop} %</p>
                <p>Precipitation: {hour.precip} mm</p>
                <p>
                  <img src={`https://www.weatherbit.io/static/img/icons/${hour.weather.icon}.png`} alt="" srcset="" /> {hour.weather.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h1>Vancouver Daily</h1>
        <ul>
          {dailyData.map((day) => {
            return (
              <li className="weather__box">
                <p>
                  {getWeekDay(day.datetime)} {new Date(day.datetime).toLocaleDateString()}
                </p>
                <p>
                  {Math.round(day.high_temp)}°C | {celsiusToFahrenheit(day.high_temp)} °F
                </p>
                <p>
                  {Math.round(day.low_temp)}°C | {celsiusToFahrenheit(day.low_temp)}°F
                </p>

                <p>Pop: {day.pop} %</p>
                <p>Precipitation: {day.precip} mm</p>
                <p>
                  <img src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`} alt="" srcset="" /> {day.weather.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
