import axios from 'axios';

export function getBooks(limit = 10, skip = 0, order = 'desc',list='') {
	const url = `/api/getBooks?limit=${limit}&skip=${skip}&order=${order}`;
	const request = axios.get(url)
					.then((response) => {
						if(list){
							return [...list,...response.data]
						}else{
							return response.data
						}

					});

	return {
		type: 'Get_Books',
		payload: request
	};
};

//action to get the data of the book with the reviewer.....

export function getBookWithReviewer(id){

	const request = axios.get(`/api/getBook?id=${id}`);

	//two run two queries in one request we use Redux Thunk middleware
	//thunk give us a dispatch method witch send data to reducer when both the request done..
	return(dispatch)=>{
		request.then(({data})=>{
			let book = data
		
			//getting the owner data using the owner id from the book data

			axios.get(`/api/getReviewer?id=${book.ownerId}`)
			.then(({data})=>{

				let response = {
					book: book,
					reviewer:data
				}
				//send the responce to the reducer.....
				dispatch({
					type:'Get_Book_W_Reviewer',
					payload:response
				})
			})
		
		
		})
	}
	
}

//making action to clear the store on reload.......

export function clearBookWithReviewer(){
	return{
		type:"Clear_Book_W_Reviewer",
		payload:{
			book:{},
			reviewer:{}
		}
	}
}

//---------------User-----------------//


export const userLogin =()=>{
 return{
	 type:"User_Login",
	 payload:null
 }
}