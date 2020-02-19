const Book = require("../models/book.models");
//Mengambil semua data buku
exports.findAll = (req, res) => {
    Book.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Terjadi kesalahan"
            });
        } else res.send(data);
    });
};

// Mengambil buku yang memiliki id = id
exports.findOne = (req, res) => {
    Book.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Buku dengan id ${req.params.id} tidak
   ditemukan`
                });
            } else {
                res.status(500).send({
                    message: `Error ketika mengambil buku dengan id
${req.params.id}`
                });
            }
        } else {
            res.send(data);
        }
    });
};
// Membuat data buku baru
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content tidak boleh kosong"
        });
    }
    const book = new Book({
        title: req.body.title,
        description: req.body.description,
        images: req.body.images
    });
    Book.create(book, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Terjadi kesalahan"
            });
        }
        else {
            res.send(data);
        }
    });
};
// Mengupdate data buku yang memiliki id = id
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content tidak boleh kosong"
        });
    }
    Book.updateById(
        req.params.id,
        new Book(req.body), (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Buku dengan id ${req.params.id} tidak
ditemukan`
                    });
                } else {
                    res.status(500).send({
                        message: `Error ketika mengupdate buku dengan id
${req.params.id}`
                    });
                }
            } else {
                res.send(data);
            }
        }
    );
};
// Menghapus buku yang memiliki id = id
exports.delete = (req, res) => {
    Book.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Buku dengan id ${req.params.id} tidak
ditemukan`
                });
            } else {
                res.status(500).send({
                    message: `Error ketika menghapus buku dengan id
${req.params.id}`
                });
            }
        } else res.send({
            message: `Berhasil menghapus data buku!`
        });
    });
};
// Menghapus semua buku
exports.deleteAll = (req, res) => {
    Book.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Terjadi kesalahan"
            });
        }
        else {
            res.send({
                message: `Berhasil menghapus seluruh data buku!` });
        }
    });
};