var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('attendance.db');


db.serialize(function() {
    db.run("CREATE TABLE users (id INT PRIMARY KEY, name TEXT)");
    db.run("CREATE TABLE timeinout (id INT PRIMARY KEY, userid INT, datetime TEXT,typeinout TEXT)");
   
    var insertusers = db.prepare("INSERT INTO users VALUES (?,?)");
    var inserttimeinout = db.prepare("INSERT INTO timeinout VALUES (?,?,?,?)");

    insertusers.run(1,"julius");
    inserttimeinout.run(1, 1, Date(), "I");

    insertusers.finalize();
    inserttimeinout.finalize();

    db.each("SELECT userid, datetime, typeinout FROM timeinout", function(err, row) {
        console.log("User id : "+row.userid, row.datetime, row.typeinout);
    });
});

db.close();