import GalleryApiService from './js/api-servise';
import { Notify } from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  galleryWrap: document.querySelector('.gallery'),
  form: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const galleryApiService = new GalleryApiService();
var lightbox = new SimpleLightbox('.gallery a', {   captionsData: "alt",
captionDelay: 250, }); 


refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  clearGalleryMarkup()
  galleryApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  
  console.log(galleryApiService.searchQuery);
  if (!galleryApiService.searchQuery) {
    clearGalleryMarkup();
    Notify.warning('Please write something');
    refs.form.reset()
    return;
  };

  // galleryApiService.resetPage()


galleryApiService.fetchGallery()
  createGalleryMarkup(aaa);

}

function createGalleryMarkup(cards) {
  console.log(cards);
  refs.galleryWrap.insertAdjacentHTML(
    'beforeend',
    cards
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
      <a href="${largeImageURL}">
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
        </a>
      </div>`
      )
      .join('')
  );
}

function clearGalleryMarkup() {
  refs.galleryWrap.innerHTML = '';
}

async function onLoadMore() {
  const getMorePhotos = await galleryApiService.fetchGallery();
  createGalleryMarkup(getMorePhotos.data.hits)
}

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import GalleryApiService from './js/api-servise';
// import { Notify } from 'notiflix';
// import axios from 'axios';
// import GalleryApiService from './js/api-servise';

// const refs = {
//   galleryWrap: document.querySelector('.gallery'),
//   form: document.querySelector('#search-form'),
//   loadMoreBtn: document.querySelector('.load-more'),
// };

// const galleryApiService = new GalleryApiService();

// let page = 1;
// let perPage = 40;
// let searchQuery = '';

// refs.form.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);

// async function onSearch(e) {
//   e.preventDefault();

//   searchQuery = e.currentTarget.elements.searchQuery.value.trim();
//   console.log(searchQuery);
//   if (!searchQuery) {
//     clearGalleryMarkup();
//     Notify.warning('Please write something');
//     return;
//   }

//   const aaa = await fetchGallery(searchQuery, page, perPage);

//   createGalleryMarkup(aaa.data.hits);
//   refs.form.reset();
// }

// function createGalleryMarkup(cards) {
//   console.log(cards);
//   refs.galleryWrap.insertAdjacentHTML(
//     'beforeend',
//     cards
//       .map(
//         ({
//           webformatURL,
//           largeImageURL,
//           tags,
//           likes,
//           views,
//           comments,
//           downloads,
//         }) => `<div class="photo-card">
//       <a href="${largeImageURL}">
//         <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//         <div class="info">
//           <p class="info-item">
//             <b>Likes: ${likes}</b>
//           </p>
//           <p class="info-item">
//             <b>Views: ${views}</b>
//           </p>
//           <p class="info-item">
//             <b>Comments: ${comments}</b>
//           </p>
//           <p class="info-item">
//             <b>Downloads: ${downloads}</b>
//           </p>
//         </div>
//         </a>
//       </div>`
//       )
//       .join('')
//   );
// }

// function clearGalleryMarkup() {
//   refs.galleryWrap.innerHTML = '';
// }

// function onLoadMore() {}
