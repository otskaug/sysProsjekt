const Dao = require("./dao.js");


module.exports = class articleDao extends Dao {

    getAll(callback) {
        super.query("select * from NettAvis ",
            [],
            callback
        );
    }

    getAllLimit(callback) {
        super.query("select * from NettAvis ORDER BY tidspunkt DESC LIMIT 5",
            [],
            callback
        );
    }

    getOne(id, callback) {
        super.query(
            "select * from NettAvis where id=?",
            [id],
            callback
        );
    }

    getFromOverskrift(overskrift, callback) {
        super.query(
            "select * from NettAvis where overskrift=?",
            [overskrift],
            callback
        );
    }

    getKategori(kategori, callback){
        super.query(
            "select * from NettAvis where kategori=?",
            [kategori],
            callback
        );
    }

    getUserArticle(user_fk, callback){
        super.query(
            "select * from NettAvis where user_fk=?",
            [user_fk],
            callback
        );
    }

    getImportant(viktighet, callback) {
        super.query(
            "select * from NettAvis where viktighet = ? ORDER BY tidspunkt DESC LIMIT 20",
            [viktighet],
            callback
        );
    }

    createOne(json, callback) {
        var val = [
            json.overskrift,
            json.innhold,
            json.bilde,
            json.kategori,
            json.viktighet,
            json.user_fk
        ];
        super.query(
            "insert into NettAvis (overskrift, innhold, bilde, kategori, viktighet, user_fk) values (?,?,?,?,?,?)",
            val,
            callback
        );
    }

    updateOne(json, id, callback) {
        var val = [
            json.overskrift,
            json.innhold,
            json.bilde,
            json.kategori,
            json.viktighet,
            id
        ];
        super.query(
            "update NettAvis set overskrift=?, innhold=?, bilde=?, kategori=?, viktighet=? where id=?",
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
