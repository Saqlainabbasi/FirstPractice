export default function(state = {}, action) {
	switch (action.type) {
		case 'Get_Books':
			return { ...state, list: action.payload };
		case 'Get_Book_W_Reviewer':
			return {
				...state, 
				book:action.payload.book,
				reviewer: action.payload.reviewer
			}
		case 'Clear_Book_W_Reviewer':
				return {
					...state, 
					book:action.payload.book,
					reviewer: action.payload.reviewer
				}
		case 'Add_Book':
			return {...state,newbook: action.payload}

		case 'Clear_N_Book':
			return {...state,newbook: action.payload}

		default:
			return state;
	}
}
