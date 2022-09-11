
import GalleryApiService from './js/api-servise';
import { Notify } from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

// На завтра : 1. пофиксить консоль лог (ошибка)





const refs = {
  galleryWrap: document.querySelector('.gallery'),
  form: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  endText: document.querySelector(".end__text"),
};

const galleryApiService = new GalleryApiService();
let lightbox = {};


refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  clearGalleryMarkup()
  galleryApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  
  console.log(galleryApiService.searchQuery);

  if (!galleryApiService.searchQuery) {
    clearGalleryMarkup();
    Notify.warning('Please write something');
    refs.loadMoreBtn.classList.add("is-hidden");
    refs.endText.classList.add("is-hidden");
    refs.form.reset() 
    return;
  }
  
  refs.loadMoreBtn.classList.add("is-hidden");
  refs.endText.classList.add("is-hidden");

  galleryApiService.resetPage()

  const filesFromBackEnd = await galleryApiService.fetchGallery()
  console.log(filesFromBackEnd.data.hits.length)

  createGalleryMarkup(filesFromBackEnd.data.hits);
  onSubmitControl(filesFromBackEnd);

  lightbox = new SimpleLightbox('.gallery a', {   captionsData: "alt",
  captionDelay: 250, }); 

refs.form.reset()
}



function onSubmitControl(filesFromBackEnd) {
  if (filesFromBackEnd.data.total > 500) {
    Notify.success(`Hooray! We found ${filesFromBackEnd.data.total} images, but we can only show the first ${filesFromBackEnd.data.totalHits}!`);
    refs.loadMoreBtn.classList.remove("is-hidden");
  }
  else if (filesFromBackEnd.data.total > 40 && filesFromBackEnd.data.total <= 500 ) {
    Notify.success(`Hooray! We found ${filesFromBackEnd.data.total} images!`);
    refs.loadMoreBtn.classList.remove("is-hidden");
    refs.endText.classList.add('is-hidden')
  }
else if(filesFromBackEnd.data.totalHits > 0 && filesFromBackEnd.data.totalHits <= 40) {
  Notify.success(`Hooray! We found ${filesFromBackEnd.data.total} images!`);
  refs.loadMoreBtn.classList.add("is-hidden");
    refs.endText.classList.remove('is-hidden')
}

  else if (filesFromBackEnd.data.total === 0) { 
    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    refs.loadMoreBtn.classList.add("is-hidden");
}
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
        <img src="${webformatURL}" alt="${tags}" loading="lazy" height ="300" width = "400" />
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
  )
}

function clearGalleryMarkup() {
  refs.galleryWrap.innerHTML = '';
}

async function onLoadMore() {
  const filesFromBackEnd = await galleryApiService.fetchGallery();
  createGalleryMarkup(filesFromBackEnd.data.hits)
  console.log(filesFromBackEnd.data.hits)
  if (filesFromBackEnd.data.hits.length >= 0 && filesFromBackEnd.data.hits.length < 40) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    refs.loadMoreBtn.classList.add("is-hidden");
    refs.endText.classList.remove("is-hidden");
  }
  else if(galleryApiService.page === 13) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    refs.loadMoreBtn.classList.add("is-hidden");
    refs.endText.classList.remove("is-hidden");
  }
  lightbox.refresh()
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
