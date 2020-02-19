const sql = require("../models/db");
sql.query("DROP TABLE books", (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Table berhasil dihapus");
    }
});