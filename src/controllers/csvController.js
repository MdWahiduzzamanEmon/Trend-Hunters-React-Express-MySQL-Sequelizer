const db = require("../models");
//main model

const Employee = db.employeesTable;

const fs = require("fs");
const csv = require("fast-csv");

const multipleDataUpload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let employees = [{message:"Employees created successfully!"}];

let path = __basedir + "/resources/static/assets/uploads/" + req.file.filename;
    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        employees.push(row);
      })
      .on("end", () => {
        Employee.bulkCreate(employees)
          .then(() => {
            res.status(200).send(
              employees
            );
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};


module.exports = {
   multipleDataUpload
};
