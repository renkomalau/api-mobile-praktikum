//app/models/book.models.js
const sql = require("./db.js");
const User = function (user) {
    this.nama = user.nama;
    this.password = user.password;
    this.images = user.images;
    this.email = user.email;
};

//Mengambil semua data buku
User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("result: ", res);
        result(null, res);
    });
};
// Mengambil buku yang memiliki id = BookId
User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log(res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};
// Membuat data buku baru
User.create = (newUser, result) => {
    console.log(newUser);
    sql.query("INSERT INTO users (nama,email,password,images) VALUES(?,?,?,?)",
    [newUser.nama, newUser.email, newUser.password, newUser.images], (err,
        res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(res);
        console.log("buat user: ", {
            id: res.insertId, ...newUser
        });
        result(null, { id: res.insertId, ...newUser });
    });
};
// Mengupdate data buku yang memiliki id = id
User.updateById = (id, User, result) => {
    sql.query(
        "UPDATE Users SET nama = ?, email = ?, password = ?, images = ? WHERE id = ? ",
    [User.nama, User.email, User.password, User.images, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("update user: ", { id: id, ...User });
            result(null, { id: id, ...User });
        }
    );
};
// Menghapus buku yang memiliki id = id
User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Book with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("hapus users dengan id: ", id);
        result(null, res);
    });
};
// Menghapus semua buku
User.removeAll = result => {
    sql.query("DELETE FROM Users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`Menghapus ${res.affectedRows} user`);
        result(null, res);
    });
};
module.exports = User;