export default function(state = {}, action) {
	switch (action.type) {
		case 'User_Login':
			return{
				...state, login:action.payload
			}
		case 'User_Auth':
			return{
				...state, login:action.payload
			}

		case 'User_Post':
			return{
				...state, userPosts:action.payload
			}
		default:
			return state;
	}
}
