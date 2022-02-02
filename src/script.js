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
function showWeather(response) {
  let cityElement = document.querySelector("#city");
  let descriptionWeather = document.querySelector("#description");
  let tempWeather = document.querySelector("#temperature");
  celsiusTemperature = Math.round(response.data.main.temp);
  let windWeather = document.querySelector("#wind");
  let humidityWeather = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = response.data.name;
  tempWeather.innerHTML = celsiusTemperature;
  let roundWind = Math.round(response.data.wind.speed);
  windWeather.innerHTML = `${roundWind}km/hm`;
  humidityWeather.innerHTML = `${response.data.main.humidity}%`;
  descriptionWeather.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchByCity(event) {
  event.preventDefault();
  let cityName = document
    .querySelector("#inlineFormInputName2")
    .value.toLowerCase();
  if (cityName.trim().length != "") {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
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

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fareheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  //remove the active class celsius
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");

  temperatureElement.innerHTML = Math.round(fareheitTemperature);
}
function displaycelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let farenheitLink = document.querySelector("#fahrenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemperature);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchByCity);

apiKey = "7a088f73941e6a828a29489663c7f3f7";
let urlDefault = `https://api.openweathermap.org/data/2.5/weather?q=Tehran&units=metric&appid=${apiKey}`;
axios.get(urlDefault).then(showWeather);
