const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'',
    database:"employeesystem",

});
app.post("/create", (req, res) =>{
  const Fname = req.body.Fname;
  const Lname = req.body.Lname;
  const Contact = req.body.contact;
  const Email = req.body.email;
  const Birthday = req.body.birthday;
  const salary = req.body.salary;
  const department = req.body.department;
  const bonus = req.body.bonus;

  db.query("INSERT INTO employees (Emp_FName, Emp_LName, Emp_Contact, Emp_Email, Emp_BDate, Emp_Salary, Emp_Department) VALUES (?,?,?,?,?,?,?)", 
  [Fname, Lname, Contact, Email, Birthday, salary, department], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send("Values Inserted");
      }
  });
});
app.post("/deptAdd", (req, res) =>{
    const department = req.body.department
    db.query("INSERT INTO department (Dept_Name) VALUES (?)", 
    [department], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {  
            res.send("Values Inserted");
        }
    });
});

app.post("/addBonus", (req, res) =>{
  const department = req.body.department
  const bonus = req.body.bonus
  db.query("INSERT INTO bonus (Dept_Name, Amount) VALUES (?,?)", 
  [department, bonus], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {  
          res.send("Values Inserted");
      }
  });
});

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
app.get("/getDept", (req, res) => {
    db.query("SELECT * FROM department", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.get("/getBonus", (req, res) => {
    db.query("SELECT * FROM bonus", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.put("/update", (req, res) => {
    const id = req.body.id;
    const salary = req.body.salary;
    db.query(
      "UPDATE employees SET Emp_Salary = ? WHERE EmployeeID = ?",
      [salary, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE EmployeeID = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(3001, ()=> {
console.log("Yey mennn");
});

