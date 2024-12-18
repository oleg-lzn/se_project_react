function getCityAndWeather(latitude, longitude, apiKey) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      const date = Math.floor(Date.now() / 1000);
      return {
        city: data.name,
        temperature: {
          F: data.main.temp,
          C: Math.round(((data.main.temp - 32) * 5) / 9),
        },
        feeling:
          data.main.temp >= 86 ? "hot" : data.main.temp >= 60 ? "warm" : "cold",
        weather:
          data.weather[0].id >= 200 && data.weather[0].id <= 232
            ? "storm"
            : data.weather[0].id >= 300 && data.weather[0].id <= 321
            ? "rain"
            : data.weather[0].id >= 500 && data.weather[0].id <= 531
            ? "rain"
            : data.weather[0].id >= 600 && data.weather[0].id <= 622
            ? "snow"
            : data.weather[0].id >= 701 && data.weather[0].id <= 781
            ? "fog"
            : data.weather[0].id >= 801 && data.weather[0].id <= 804
            ? "cloudy"
            : "sunny",
        dayTime:
          date >= data.sys.sunrise && date < data.sys.sunset ? "day" : "night",
      };
    });
}

export default getCityAndWeather;
