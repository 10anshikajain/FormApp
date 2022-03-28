var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

const port = 2410;
app.listen(port, console.log("Listening on port : ", port));
let userData = [
    {
    title: "Leave Form",
    answer: "Half Day"
    },
    {
        title: "Issue Form",
        answer: "Reimbursement"
        },
]

app.get("/userForm", function (req, res) {
  res.send(userData);
});

app.post("/userForm", function (req, res) {
  let body = { ...req.body };
  //console.log("Post Called");
  userData.push(body);
  let obj = { ...body };
  res.send(obj);
});

app.put("/userForm/:id", function (req, res) {
  let id = req.params.id;
  let index = userData.findIndex((obj) => obj.id === id);
  // console.log(index);
  let obj = { ...req.body };
  delete obj.id;
  let body = userData[index];
  let obj1 = { ...body, ...obj };
  userData[index] = obj1;
  res.send(userData[index]);
});

app.delete("/userForm/:id", function (req, res) {
  let id = req.params.id;
  // console.log("Delete Called");
  let index = userData.findIndex((obj) => obj.id === id);
  userData.splice(index, 1);
  //console.log(userData);
  res.send(userData);
});