const API_KEY = '21253652-b0771bb4bc82300d1ee8677db';
const BASE_URL = 'https://pixabay.com/api/';

export default class PixabayService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchHits() {
    try {
      const dataUrl = `/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
      const response = await fetch(BASE_URL + dataUrl);
      const newResponse = await response.json();
      return newResponse.hits;
    } catch (err) {
      console.log(err);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
