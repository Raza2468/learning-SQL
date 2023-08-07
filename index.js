const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
let mysql = require("mysql");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Successfully Connect.....");
});

// app.get("/createdb", (req, res) => {
//   let sql = "CREATE employee nodemysql";

//   db.query(sql, (err) => {
//     if (err) {
//       throw err;
//     }

//     res.send("Database created");
//   });
// });

// ====================> get all data

app.get("/", (req, res) => {
  db.query("SELECT * FROM `employeetable` WHERE 1", (err, result) => {
    if (err) throw err;
    else {
      // console.log(result);
      res.send(result);
    }
  });
});

// ====================> get specific data

app.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM `employeetable` WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) throw err;
      else {
        console.log(result[1]);
        res.send(result);
      }
    }
  );
});

// ====================> post data

app.post("/createemployee", (req, res) => {
  let { firstname, lastname, email, phonenumber, department, position } =
    req.body;
  let post = {
    phonenumber: phonenumber,
    department: department,
    firstname: firstname,
    lastname: lastname,
    position: position,
    email: email,
  };

  let sql = "INSERT INTO employeetable SET ?";

  db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }
    console.log(post);
    res.send(post);
  });
});

app.post("/updateemployee/:id", (req, res) => {
  let newName = "MERN Stack Developer";
  let department = "Developer";

  let sql = `UPDATE employeetable SET position = '${newName}', department = '${department}' WHERE id = ${req.params.id}`;
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }

    res.send("Post updated...");
  });
});

// ====================> delet data

app.post("/deleteemployee/:id", (req, res) => {
  let sql = `DELETE FROM employeetable WHERE id = ${req.params.id}`;
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee deleted");
  });
});

app.listen("5000", () => {
  console.log("server start Port ===>", `http://localhost:5000`);
});
