const Dao = require("./dao.js");

module.exports = class kategorierDao extends Dao {
    getAll(callback) {
        super.query("select kategori from kategorier",
            [],
            callback
        );
    }
};
