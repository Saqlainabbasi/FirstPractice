import axios from 'axios';
//default argument to the get books function....
//** ...list */ this syntax add the old state properties to the new state generated....
export function getBooks(limit = 10, skip = 0, order = 'desc', list = '') {
	const url = `/api/getBooks?limit=${limit}&skip=${skip}&order=${order}`;
	const request = axios.get(url)
		.then((response) => {
			if (list) {
				return [...list, ...response.data]
			} else {
				return response.data
			}

		});

	return {
		type: 'Get_Books',
		payload: request
	};
};

//action to get the data of the book with the reviewer.....

export function getBookWithReviewer(id) {

	const request = axios.get(`/api/getBook?id=${id}`);

	//two run two queries in one request we use Redux Thunk middleware
	//thunk give us a dispatch method witch send data to reducer when both the request done..
	return (dispatch) => {
		request.then(({ data }) => {
			let book = data

			//getting the owner data using the owner id from the book data

			axios.get(`/api/getReviewer?id=${book.ownerId}`)
				.then(({ data }) => {

					let response = {
						book: book,
						reviewer: data
					}
					//send the responce to the reducer.....
					dispatch({
						type: 'Get_Book_W_Reviewer',
						payload: response
					})
				})


		})
	}

}

//making action to clear the store on reload.......

export function clearBookWithReviewer() {
	return {
		type: "Clear_Book_W_Reviewer",
		payload: {
			book: {},
			reviewer: {}
		}
	}
}

export const addBookReview = (books)=> {
	const request = axios.post('/api/book',books)
					.then(response => response.data)
	return{
		type:"Add_Book",
		payload:request
	}
}

export const clearNewBook = () => {
	return{
		type:'Clear_N_Book',
		payload:{}
	}
}


//---------------User-----------------//


export const userLogin = ({ email, password }) => {
	
	const request = axios.post('/api/login', { email, password })
	.then((response => response.data))
	
	return {
		type: "User_Login",
		payload: request
	}
}

export const auth = () => {
	
	const request = axios.get('/api/auth')
	.then(response => response.data)
		// .catch(error =>({state:error}))

	return {
		type: 'User_Auth',
		payload: request
	}
}
export const getUserPost = (userId) => {
	const request = axios.get(`/api/user_posts?user=${userId}`)
		.then(response => response.data)
		
		return {
		type: 'User_Post',
		payload: request
	}
}