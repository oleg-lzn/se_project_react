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
      return {
        city: data.name,
        temperature: data.main.temp,
        feeling:
          data.main.temp >= 86 ? "hot" : data.main.temp >= 66 ? "warm" : "cold",
      };
    })
    .catch((err) => {
      console.error("Error fetching weather data:", err);
    });
}

export default getCityAndWeather;
