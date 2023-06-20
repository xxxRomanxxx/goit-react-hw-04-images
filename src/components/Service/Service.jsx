import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37209815-b4fb3ec1c4197292e1af8c69e';

function fetchApi (searchQuery, page = 1) {

	const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return axios.get(url)
  .then(response => {
    return response.data})
}

const api = {
	fetchApi,
};

export default api;