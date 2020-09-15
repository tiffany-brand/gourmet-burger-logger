const orm = require("../config/orm")

const burger = {
    selectAll: function () {
        return orm.selectAll("burgers");
    },
    // The variables cols and vals are arrays.
    insertOne: function (cols, vals) {
        return orm.create("burgers", cols, vals);
    },
    updateOne: function (objColVals, condition) {
        return orm.update("burgers", objColVals, condition);
    },
    deleteOne: function (condition) {
        return orm.delete("burgers", condition);
    }
};

module.exports = burger;