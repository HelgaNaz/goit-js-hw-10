import './css/styles.css';
import { debounce } from 'lodash';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchCountries } from "./fetchCountries.js";


const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener("input", debounce( 
    (event) => {
    const name = (event.target.value).trim();
    console.log('name', name);
    fetchCountries(name)
    .then((data) => renderCountries(data))
    .catch((error) => console.log(error));
}
    , DEBOUNCE_DELAY)
    );


    function renderCountries(data) {
    console.log('data', data)
    console.log(data.length)
    if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.', {
                position: 'center-top',
                timeout: 4000,
                clickToClose: true,
    });
      countryList.innerHTML = "";
      countryInfo.innerHTML = "";
  } else if (data.length === 1) {
    const markup = data
      .map(({ flags, name, capital, population, languages }) => {
      
      return `
          <h2><img class="picture" src="${flags.svg}" alt="Flag" width = 30px>${name.official}</h2>
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p><b>Languages</b>: ${Object.values(languages)}</p>
        `;
    })
      .join("");
      countryList.innerHTML = "";
      countryInfo.innerHTML = markup;
      
    } else if (data.length > 1 && data.length <= 10) {
      const markup = data
      .map(({flags, name}) => {
      
      return `<li>
          <h2><img class="picture" src="${flags.svg}" alt="Flag" width = 30px>${name.official}</h2>
        </li>`;
    })
        .join("");
      countryInfo.innerHTML = "";
      countryList.innerHTML = markup;
    } 
}
