export default function(state = {}, action) {
	switch (action.type) {
		case 'User_Login':
			return{
				...state, login:action.payload
			}
		default:
			return state;
	}
}
