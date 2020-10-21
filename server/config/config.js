//**production *// property of the config object will only work when its deploied to live server
//**default  *// this will work on loacalserver....
//**env.SECRET *// is the supersecret password that we use to hash or userpassword
const config = {
	production: {
		SECRET: process.env.SECRET,
		DATABASE: process.env.MONGODB_URI
	},
	default: {
		SECRET: 'supersecretpassword123',
		DATABASE: 'mongodb://localhost:27017/bookShelf'
	}
};
//exporting the get function which return the env we are working on...
exports.get = function get(env) {
	return config[env] || config.default;
};
