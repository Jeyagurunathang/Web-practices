'use strict';

const mainContainer = document.querySelector('.main');

const dateEl = document.querySelector('.date--details');

const searchForm = document.querySelector('.search--form');
const searchBox = document.querySelector('.search--box');

const dailyTemperatureContainer = document.querySelector('.temperature');
const dailyWindContainer = document.querySelector('.wind--details');

const forecastContainer = document.querySelector('.forecast--details');

const currentClimate = document.querySelector('.current--climate');
const hourClimateContainer = document.querySelector('.climate_data--hour');

let currentWeather, forecastWeather;

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// prettier-ignore
const directions = {
  W: 'West',
  E: "East",
  N: "North",
  S: "South",
  ESE: "East-Southeast",
  ENE: "East-Northeast",
  SSW: "South-Southwest",
  SSE: "South-Southeast",
  NNE: "North-Northeast",
  NNW: "North-Northwest",
  WSW: "West-Southwest",
  WNW: "West-Northwest",
  SE: "South East",
  SW: "South West",
  NE: "North East",
  NW: "North West",
};

class DailyClimate {
  date = new Date();
  country;

  current;
  forecast;

  hourlyClimateData;

  forecastTemperature;
  forecastWeatherCondition;
  forecastWeatherIcon;
  forecastDates;

  constructor() {
    this._getTheCurrentLocation();
    searchForm.addEventListener(
      'submit',
      this._getTheCountryWeather.bind(this)
    );
    this._renderCurrentDate();
  }

  _renderCurrentDate() {
    const options = {
      month: 'long',
      year: 'numeric',
      day: '2-digit',
    };
    const date = new Intl.DateTimeFormat(navigator.language, options).format(
      this.date
    );

    const currentDate = `<p class="date">${date}</p>`;
    dateEl.insertAdjacentHTML('beforeend', currentDate);
  }

  async _getTheCurrentLocation() {
    const locationCoords = new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const currentPosition = await locationCoords;
    const { latitude: lat, longitude: lng } = currentPosition.coords;

    this._getTheCurrentCountry(lat, lng);
  }

  async _getTheCurrentCountry(lat, lng) {
    try {
      const countryData = await fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=937871368053386777021x33180`
      );

      if (!countryData.ok)
        throw new Error('Something went wrong to get the country name');

      const countryResponse = await countryData.json();
      this.country = countryResponse.country;

      if (!this.country) return;

      // Render the country name in the search box
      this._renderTheCountryInSearchBox(this.country);

      // Get the country weather
      this._getTheCountryWeather();
    } catch (err) {
      console.error(err);
    }
  }

  _renderTheCountryInSearchBox() {
    searchBox.value = this.country;
  }

  _getTheCountryWeather(e = '') {
    if (e) {
      e.preventDefault();

      this.country = searchBox.value;
      searchBox.blur();
    }

    // Clearing the forecast data from the dom
    this._clearingForecastDOM();

    // Clearing the hourly climate data from the dom
    this._clearingHourClimate();

    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=5e54b37f00504eb8a14161117232306 &q=${this.country}&days=6&aqi=yes&alerts=no`
    )
      .then(res => res.json())
      .then(data => {
        // const { current, forecast } = data;
        this.current = data.current;
        this.forecast = data.forecast;

        // Rendering Current climate data
        this._renderTheCurrentClimate();

        // Rendering after 3 days forecast data
        this._renderTheForecastData();

        // Render the current climate condition
        this._renderTheCurrentClimateCondition();

        // Get the current hourly climate data
        this._getTheHourlyClimateData();

        // Render the current climate weather image in the background
        this._renderTheBackgroundImage();
      });
  }

  _renderTheCurrentClimate() {
    // Render the temperature in the DOM
    const dailyTemperature = `<span class="temp_c">${this.current.temp_c}</span><sup>o</sup>C`;
    const dailyWindDetails = `<span class="wind--icon"><i class="fa-solid fa-wind font-icon"></i></span> ${
      directions[this.current.wind_dir]
    }, ${this.current.wind_kph}`;

    dailyTemperatureContainer.innerHTML, (dailyWindContainer.innerHTML = '');

    dailyTemperatureContainer.innerHTML = dailyTemperature;
    dailyWindContainer.innerHTML = dailyWindDetails;
  }

  _renderTheCurrentClimateCondition() {
    currentClimate.textContent = this.current.condition.text;
  }

  _renderTheBackgroundImage() {
    mainContainer.style.backgroundImage = `url("images/Weather/${this.current.condition.text}.jpg")`;
  }

  _renderTheForecastData() {
    const { forecastday } = this.forecast;

    const days = [
      forecastday?.[1],
      forecastday?.[2],
      forecastday?.[3],
      forecastday?.[4],
      forecastday?.[5],
    ];
    // Getting Weather Icons
    this.forecastWeatherIcon = days.map(day => day.day.condition.icon);

    // Getting Days
    this.forecastDates = days
      .map(day => new Date(day.date))
      .map(date => this._getForecastDates(date));

    // Getting Weather Conditions
    this.forecastWeatherCondition = days.map(day => day.day.condition.text);

    // Gettting forecast temperatures
    this.forecastTemperature = days.map(day => day.day.maxtemp_c);

    this.forecastWeatherIcon.forEach((icon, i) =>
      this._renderForecastDataInDOM(
        icon,
        this.forecastDates[i],
        this.forecastWeatherCondition[i],
        this.forecastTemperature[i]
      )
    );
  }

  _getForecastDates(date) {
    const options = {
      month: 'long',
      day: '2-digit',
      weekday: 'long',
    };

    return new Intl.DateTimeFormat(navigator.language, options).format(date);
  }

  _renderForecastDataInDOM(icon, date, weather, temperature) {
    // this._clearingForecastDOM();

    const html = `
      <div class="forecast_weather--details">
      <div class="icon">
        <img src="${icon}">
      </div>
      <div class="yesterday--date">
        <p class="forecast--date">${date}</p>
        <p class="forecast--climate">${weather}</p>
      </div>
      <div class="forecast--temperature">
        <p>${temperature} <sup>o</sup> C</p>
      </div>
    `;

    forecastContainer.insertAdjacentHTML('beforeend', html);
  }

  _clearingForecastDOM() {
    forecastContainer.innerHTML = '';
  }

  // Getting the hourly climate data
  _getTheHourlyClimateData() {
    const currentHour = this.date.getHours();
    this.hourlyClimateData = this.forecast.forecastday?.[0].hour;

    const requiredData = this.hourlyClimateData.filter((_, i) => {
      const climateDate = new Date(this.hourlyClimateData[i].time);
      return climateDate.getHours() > currentHour;
    });
    console.log(requiredData);

    const temperature = requiredData.map(data => data.temp_c);
    const icon = requiredData.map(data => data.condition.icon);
    const time = requiredData.map(data => new Date(data.time).getHours());
    console.log(time);

    time.forEach((time, i) =>
      this._renderHourlyClimateCondition(time, icon[i], temperature[i])
    );
  }

  _renderHourlyClimateCondition(time, icon, temperature) {
    const html = `
      <div class="hour_climate--box">
        <p class="hour">${time}:00</p>
        <div class="hour_climate--icon">
          <img src="${icon}">
        </div>
        <p class="hour--temperature">${temperature}<sup>o</sup>C</p>
      </div>
    `;

    hourClimateContainer.insertAdjacentHTML('beforeend', html);
  }

  _clearingHourClimate() {
    hourClimateContainer.innerHTML = '';
  }
}

const climate = new DailyClimate();
