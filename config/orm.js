const connection = require('./connection.js');

// Import MySQL connection.
class ORM {
	connection;

	constructor(connection) {
		this.connection = connection;
	}

	// make queries use promises
	query = (queryString, vals) => {
		return new Promise((resolve, reject) => {
			this.connection.query(queryString, vals, function (err, result) {
				if (err) {
					reject(err);
				}
				resolve(result);
			});
		});
	};
	// Helper function for SQL syntax: code from CatsApp classwork activity.
	// Let's say we want to pass 3 values into the mySQL query.
	// In order to write the query, we need 3 question marks.
	// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
	// ["?", "?", "?"].toString() => "?,?,?";
	printQuestionMarks(num) {
		const arr = [];

		for (let i = 0; i < num; i++) {
			arr.push('?');
		}
		return arr.toString();
	}

	// Helper function to convert object key/value pairs to SQL syntax - code from CatsApp classwork activity
	objToSql(ob) {
		const arr = [];

		// loop through the keys and push the key/value as a string int arr
		for (let key in ob) {
			const value = ob[key];
			// check to skip hidden properties
			if (Object.hasOwnProperty.call(ob, key)) {
				// if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
				if (typeof value === 'string' && value.indexOf(' ') >= 0) {
					value = "'" + value + "'";
				}
				// e.g. {burger_name: 'Bacon Burger'} => ["burger_name='Bacon Burger'"]
				// e.g. {devoured: true} => ["devoured=true"]
				arr.push(key + '=' + value);
			}
		}

		// translate array of strings to a single comma-separated string
		return arr.toString();
	}

	// Object for all our SQL statement functions.
	selectAll(tableInput) {
		return this.query('SELECT * FROM ' + tableInput + ';');
	}

	insertOne(table, cols, vals) {
		let queryString = 'INSERT INTO ' + table;

		queryString += ' (';
		queryString += cols.toString();
		queryString += ') ';
		queryString += 'VALUES (';
		queryString += this.printQuestionMarks(vals.length);
		queryString += ');';

		return this.query(queryString, vals);
	}

	updateOne(table, objColVals, condition) {
		let queryString = 'UPDATE ' + table;

		queryString += ' SET ';
		queryString += this.objToSql(objColVals);
		queryString += ' WHERE ';
		queryString += condition;

		return this.query(queryString);
	}

	deleteOne(table, condition) {
		let queryString = 'DELETE FROM ' + table;
		queryString += ' WHERE ';
		queryString += condition;

		return this.query(queryString);
	}
}

// Export an instance of the ORM object
module.exports = new ORM(connection);
