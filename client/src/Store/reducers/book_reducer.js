export default function(state = {}, action) {
	switch (action.type) {
		case 'Get_Books':
			return { ...state, list: action.payload };
		default:
			return state;
	}
}
