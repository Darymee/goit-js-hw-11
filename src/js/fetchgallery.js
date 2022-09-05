import axios from 'axios';
export { fetchGallery };

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29734791-3fd561d0afce25ff9315d455c';

// async function fetchGallery() {
//   try {
//     const response = await axios.get(`${BASE_URL}?key=${KEY}&q=`);
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
