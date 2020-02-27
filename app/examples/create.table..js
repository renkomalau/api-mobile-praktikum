const sql = require("../models/db");
sql.query("CREATE TABLE users (id int NOT NULL AUTO_INCREMENT, "
    + "nama VARCHAR(255) NOT NULL,"
    + "email VARCHAR(255) NOT NULL,"
    + "password VARCHAR(255) NOT NULL, "
    + "images VARCHAR(255), created_at TIMESTAMP "
    + "DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(id))",
    (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Table berhasil dibuat");
        }
    });
