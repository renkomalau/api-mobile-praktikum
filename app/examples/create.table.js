const sql = require("../models/db");
sql.query("CREATE TABLE books (id int NOT NULL AUTO_INCREMENT, "
    + "title VARCHAR(255) NOT NULL, description VARCHAR(255), "
    + "images VARCHAR(255), created_at TIMESTAMP "
    + "DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(id))",
    (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Table berhasil dibuat");
        }
    });
