import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import { fetchGallery } from './js/fetchgallery';
import { Notify } from 'notiflix';
import axios from 'axios';

const refs = {
  galleryWrap: document.querySelector('.gallery'),
  form: document.querySelector('#search-form'),
  btnSubmit: document.querySelector('.btn'),
};

// refs.form.addEventListener('input');

refs.btnSubmit.addEventListener('click', onBtnClick);

function onBtnClick(e) {
  e.preventDefault();
}

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '29734791-3fd561d0afce25ff9315d455c';

async function fetchGallery(query, page, perPage) {
  try {
    const response = await axios.get(
      `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

function createGalleryMarkup(cards) {
  refs.galleryWrap.innerHTML = cards
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div>`
    )
    .join('');
}

function clearGalleryMarkup() {
  refs.galleryWrap.innerHTML = '';
}
