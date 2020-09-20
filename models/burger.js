const orm = require('../config/orm');

// burger model with all of its query functions
const burger = {
	selectAll: function () {
		return orm.selectAll('burgers');
	},
	// The variables cols and vals are arrays.
	insertOne: function (cols, vals) {
		return orm.insertOne('burgers', cols, vals);
	},
	updateOne: function (objColVals, condition) {
		return orm.updateOne('burgers', objColVals, condition);
	},
	deleteOne: function (condition) {
		return orm.deleteOne('burgers', condition);
	}
};
// export the burger model to use in the burgers_controller
module.exports = burger;
