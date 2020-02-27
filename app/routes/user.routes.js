module.exports = app => {
    const users = require("../controllers/user.controller");
    // cara mengakses gambar
    http://polibatam.ac.id/img/perpustakaan.png
    // Mengambil semua data
    app.get("/api/users", users.findAll);
    // Mengambil data buku yang memiliki id = id
    app.get("/api/users/:id", users.findOne);
    // Membuat buku baru
    app.post("/api/users", users.create);
    // Mengubah data buku yang memiliki id = id
    app.put("/api/users/:id", users.update);
    // Hapus data buku yang memiliki id = id
    app.delete("/api/users/:id", users.delete);
    // Hapus seluruh data
    app.delete("/api/users", users.deleteAll);
};