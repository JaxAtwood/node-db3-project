const db = require("../data/dbConfig.js");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
}

function find() {
    return db("schemes")
}

function findById(id) {
    return db("schemes")
    .where({id}).first()
}

function findSteps(id) {
    return db("steps")
    .join("schemes", "steps.scheme_id", "=", "schemes.id")
    .where("schemes.id", "=", id)
    .select("steps.id", "schemes.scheme_name", "steps.step_number", "steps.instructions")
    .orderBy("steps.step_number")
}

function add(scheme) {
    return db("schemes")
    .insert(scheme)
    .then(id => {
        return findById(id)
    })
}

function update(changes, id) {
    return db("schemes")
    .update(changes)
    .where({id})
    .then(resolve => {
        return changes
    })
}

function remove(id) {
    return db("schemes")
    .where("id", id)
    .del()
}