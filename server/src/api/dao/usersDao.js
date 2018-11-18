const Dao = require("./dao.js");

module.exports = class usersDao extends Dao {
    getAll(callback) {
        super.query("select name, email from Users",
            [],
            callback
        );
    }

    getOne(id, callback) {
        super.query(
            "select id, name, email, password from Users where id=?",
            [id],
            callback
        );
    }
    getOnebyEmail(email, callback) {
        super.query(
            "select id, name, email ,password from Users where email=?",
            [email],
            callback
        );
    }

    createOne(json, callback) {
        var val = [
            json.name,
            json.email,
            json.password,

        ];
        super.query(
            "insert into Users (name, email, password) values (?,?,?)",
            val,
            callback
        );
    }

    updateOne(json, id, callback) {
        var val = [
            json.name,
            json.email,
            json.password,
            id
        ];
        super.query(
            "update Users set name=?, email=?, password=? where id=?",
            val,
            callback
        );
    }

    deleteOne(id, callback) {
        super.query(
            "Delete from Users where id=?",
            [id],
            callback
        )
    }

};
