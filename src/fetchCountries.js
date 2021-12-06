import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then((response) => {
      if (!response.ok) {
        countryInfo.innerHTML = "";
        countryList.innerHTML = "";
        throw Notify.failure('Oops, there is no country with that name.', {
                position: 'center-top',
                timeout: 4000,
                clickToClose: true,
        });
        
      }
        return response.json();
    }
  );
}


