import axios from 'axios';

const API_KEY = '22610710-77f064d5489dfe1781c9024b3';
const BASE_URL = 'https://pixabay.com/api/';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
};

const fetchImages = async (imageTags, page) => {
  const response = await axios.get(
    `?q=${imageTags}&orientation=horizontal&safesearch=true&page=${page}&per_page=12`,
  );
  return response.data.hits;
};

export default fetchImages;
