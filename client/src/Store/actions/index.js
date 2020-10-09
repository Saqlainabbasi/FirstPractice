import axios from 'axios';

export function getBooks(limit = 10, skip = 0, order = 'desc') {
	const url = `/api/getBooks?limit=${limit}&skip=${skip}&order=${order}`;
	const request = axios.get(url).then((response) => response.data);

	return {
		type: 'Get_Books',
		payload: request
	};
}
