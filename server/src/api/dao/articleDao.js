const Dao = require("./dao.js");


module.exports = class articleDao extends Dao {

    getAll(callback) {
        super.query("select overskrift, innhold, bilde, kategori, viktighet, user_fk, tidspunkt from NettAvis ",
            [],
            callback
        );
    }

    getOne(id, callback) {
        super.query(
            "select overskrift, innhold, bilde, kategori, viktighet, user_fk, tidspunkt from NettAvis where id=?",
            [id],
            callback
        );
    }

    createOne(json, callback) {
        var val = [
            json.overskrift,
            json.innhold,
            json.tidspunkt,
            json.bilde,
            json.kategori,
            json.viktighet,
            json.user_fk
        ];
        super.query(
            "insert into NettAvis (overskrift, innhold, tidpunkt, bilde, kategori, viktighet, user_fk) values (?,?,?,?,?,?,?)",
            val,
            callback
        );
    }

    updateOne(json, id, callback) {
        var val = [
            json.overskrift,
            json.innhold,
            json.tidspunkt,
            json.bilde,
            json.kategori,
            json.viktighet,
            json.user_fk,
            id
        ];
        super.query(
            "update NettAvis set overskrift=?, innhold=?, tidpunkt=?, bilde=?, kategori=?, viktighet=?, user_fk=? where id=?",
            val,
            callback
        );
    }

    deleteOne(id, callback) {
        super.query(
            "Delete from NettAvis where id=?",
            [id],
            callback
        )
    }


};
