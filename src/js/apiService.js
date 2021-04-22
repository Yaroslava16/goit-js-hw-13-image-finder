const BASE_URL = 'https://pixabay.com/api/';

export default {
  key: '21253652-b0771bb4bc82300d1ee8677db',
  perPage: 12,
  pageNumber: 1,
  searchQuery: '',
  fetchImgs() {
    const query = `?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=${this.perPage}&key=${this.key}`;

    return fetch(`${BASE_URL}/${query}`).then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    });
  },
};
