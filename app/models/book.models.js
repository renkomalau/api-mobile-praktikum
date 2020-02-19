//app/models/book.models.js
const sql = require("./db.js");
const Book = function (book) {
    this.title = book.title;
    this.description = book.description;
    this.images = book.images;
};
//Mengambil semua data buku
Book.getAll = result => {
    sql.query("SELECT * FROM books", (err, res) => {
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
Book.findById = (id, result) => {
    sql.query(`SELECT * FROM Books WHERE id = ${id}`, (err, res) => {
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
Book.create = (newBook, result) => {
    console.log(newBook);
    sql.query("INSERT INTO books (title, description, images) VALUES(?,?,?)",
    [newBook.title, newBook.description, newBook.images], (err,
        res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(res);
        console.log("buat buku: ", {
            id: res.insertId, ...newBook
        });
        result(null, { id: res.insertId, ...newBook });
    });
};
// Mengupdate data buku yang memiliki id = id
Book.updateById = (id, Book, result) => {
    sql.query(
        "UPDATE Books SET title = ?, description = ?, images = ? WHERE id = ? ",
    [Book.title, Book.description, Book.images, id],
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
            console.log("update buku: ", { id: id, ...Book });
            result(null, { id: id, ...Book });
        }
    );
};
// Menghapus buku yang memiliki id = id
Book.remove = (id, result) => {
    sql.query("DELETE FROM Books WHERE id = ?", id, (err, res) => {
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
        console.log("hapus buku dengan id: ", id);
        result(null, res);
    });
};
// Menghapus semua buku
Book.removeAll = result => {
    sql.query("DELETE FROM Books", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`Menghapus ${res.affectedRows} buku`);
        result(null, res);
    });
};
module.exports = Book;