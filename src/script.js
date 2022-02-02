function formatDate(timeStamp) {
  let date = new Date(timeStamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function showWeather(response) {
  let city = document.querySelector("#city");
  let descriptionWeather = document.querySelector("#description");
  let tempWeather = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  let windWeather = document.querySelector("#wind");
  let humidityWeather = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date");
  city.innerHTML = response.data.name;
  tempWeather.innerHTML = temperature;
  let roundWind = Math.round(response.data.wind.speed);
  windWeather.innerHTML = `${roundWind}km/hm`;
  humidityWeather.innerHTML = `${response.data.main.humidity}%`;
  descriptionWeather.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function searchByCity(event) {
  event.preventDefault();
  let cityName = document
    .querySelector("#inlineFormInputName2")
    .value.toLowerCase();
  let apiKey = "7a088f73941e6a828a29489663c7f3f7";
  if (cityName.trim().length != "") {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&exclude=current&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
    axios.get(url).catch(function (error) {
      if (error.response) {
        // alert(error.response.data);
        alert(
          `There is not any information about this city, please enter another city. Error : ${error.response.status}`
        );
        document.querySelector("#inlineFormInputName2").value = "";
      }
    });
  } else {
    alert("Please Enter city!");
  }
}

let searchBtn = document.querySelector("#search");
searchBtn.addEventListener("click", searchByCity);
