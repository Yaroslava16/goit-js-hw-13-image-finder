import './styles.css';
import PixabayService from './js/apiService';
import imgCardTpl from './templates/img-card.hbs';
import getRefs from './js/get-refs';
import { onOpenModal } from './js/modal';

const refs = getRefs();
const pixabayService = new PixabayService();
const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(refs.scroll);

refs.searchForm.addEventListener('submit', onSearchClick);
refs.gallery.addEventListener('click', onOpenModal);

function onSearchClick(e) {
  e.preventDefault();

  pixabayService.query = e.currentTarget.elements.query.value;

  pixabayService.resetPage();
  clearHits();
  pixabayService.fetchHits().then(hits => {
    appendHitsMarkup(hits);
    pixabayService.incrementPage();
  });
}

function appendHitsMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', imgCardTpl(hits));
}

function clearHits() {
  refs.gallery.innerHTML = '';
}

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && pixabayService.query !== '') {
      pixabayService.fetchHits().then(hits => {
        appendHitsMarkup(hits);
        pixabayService.incrementPage();
      });
    }
  });
}
