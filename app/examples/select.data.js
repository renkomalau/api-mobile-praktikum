const sql = require("../models/db");
sql.query("SELECT * FROM books", (err, res) => {
    if (err) {
        console.log("error: ", err);
    } else {
        console.log("result: ", res);
    }
});
