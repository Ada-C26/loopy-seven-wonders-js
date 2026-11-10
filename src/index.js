import axios from 'axios';

// Be sure to store your API key in a .env file.
// The .env.sample file shows the required format.
// The package.json has been configured to load the .env file
// when using `npm start`.
// To run a script other than this `index.js` file, we need to start node
// from the project root like
// `node --env-file=.env path/to/script.js`
// (This will be useful for running the solutions.)
// const API_KEY = process.env.api_key;

// Alternatively, we can use the `dotenv` package to load the .env file
import dotEnv from 'dotenv';

dotEnv.config(); // Load variables from .env
const API_KEY = process.env.API_KEY; // Access the API_KEY from .env file

// single location call example
const placeName = 'Great Wall of China';

// Endpoint documentation: https://docs.locationiq.com/reference/search
const BASE_URL = 'https://us1.locationiq.com/v1/search';

// more details about the config structure:
// https://github.com/axios/axios#request-config

// Make a single API call to retrieve the latitude and longitude of
// the Great Wall of China. We'll use this to form the basis of our
// solutions.

const wonders = [
  'Great Wall of China',
  'Petra',
  'Colosseum',
  'Chichen Itza',
  'Machu Picchu',
  'Taj Mahal',
  'Christ the Redeemer',
];

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// Promise{lat, lon}
// const getLatLonForPlace = (placeName) => {
//   return axios.get(BASE_URL, {
//     params: {
//       key: API_KEY,
//       q: placeName,
//       format: 'json',
//     },
//   })
//     .then(response => {
//       const { lat, lon } = response.data[0]; // { lat: ..., lon: ..., ... }
//       return { lat, lon };
//     });
// };

const getLatLonForPlace = async (placeName) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: placeName,
      format: 'json',
    },
  });

  const { lat, lon } = response.data[0]; // { lat: ..., lon: ..., ... }
  return { lat, lon };
};

// const getLatLonForPlaces = (places) => {
//   let steps = Promise.resolve();
//   const result = {};

//   for (const placeName of places) {
//     steps = steps
//       .then(() => {
//         return getLatLonForPlace(placeName);
//       })
//       .then(({ lat, lon }) => {
//         result[placeName] = {lat, lon};
//         return wait(1000);
//       });
//   }

//   return steps
//     .then(() => {
//       return result;
//     });
// };

const getLatLonForPlaces = async (places) => {
  const result = {};

  for (const placeName of places) {
    const latlon = await getLatLonForPlace(placeName);
    result[placeName] = latlon;
    await wait(1000);
  }

  return result;
};

// const main = () => {
//   const result = {};

//   for (const placeName of wonders) {
//     const latlon = getLatLonForPlace(placeName);
//     result[placeName] = latlon;
//     sleep(1000);
//   }
// };

// const main = () => {
//   getLatLonForPlaces(wonders)
//     .then(result => {
//       console.log(result);
//       return;
//     })
//     .catch(error => {
//       console.log(error);
//     });

//   console.log('end of main');
// };

const main = async () => {
  try {
    const result = await getLatLonForPlaces(wonders);
    console.log(result);
  } catch (error) {
    console.log(error);
  }

  console.log('end of main');
};

// const main = () => {
//   setTimeout(() => {
//     console.log('after the break');
//   }, 1000);
//   console.log('before the break');
// };

main();