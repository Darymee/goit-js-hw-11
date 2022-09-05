import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix';

const refs = {
  galleryWrap: document.querySelector('.gallery'),
  form: document.querySelector('#search-form'),
  btn: document.querySelector('.btn'),
};

function createGalleryMarkup(cards) {
  refs.galleryWrap.innerHTML = cards
    .map(
      () => `<div class="photo-card">
        <img src="" alt="" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
          </p>
          <p class="info-item">
            <b>Views</b>
          </p>
          <p class="info-item">
            <b>Comments</b>
          </p>
          <p class="info-item">
            <b>Downloads</b>
          </p>
        </div>
      </div>`
    )
    .join('');
}

function clearGalleryMarkup() {
  refs.galleryWrap.innerHTML = '';
}
