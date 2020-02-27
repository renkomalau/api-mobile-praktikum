const User = require("../models/user.models");
//Mengambil semua data buku
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
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
    User.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User dengan id ${req.params.id} tidak ditemukan`
                });
            } else {
                res.status(500).send({
                    message: `Error ketika mengambil Users dengan id ${req.params.id}`
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
    const user = new User({
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password,
        images: req.body.images
    });
    User.create(user, (err, data) => {
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
    User.updateById(
        req.params.id,
        new User(req.body), (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `user dengan id ${req.params.id} tidak ditemukan`
                    });
                } else {
                    res.status(500).send({
                        message: `Error ketika mengupdate user dengan id ${req.params.id}`
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
    User.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Users dengan id ${req.params.id} tidak
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
    User.removeAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Terjadi kesalahan"
            });
        }
        else {
            res.send({
                message: `Berhasil menghapus seluruh data Users!` });
        }
    });
};