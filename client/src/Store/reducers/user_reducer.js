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
		case 'Get_Users':
			return{
				...state,users:action.payload
			}
		case 'User_Register':
			return{
				...state,
				register:action.payload.success,
				users:action.payload.users
			}
		default:
			return state;
	}
}
