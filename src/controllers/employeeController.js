const db = require('../models');

//main model
const Employee = db.employeesTable;


// for pagination
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? limit * (page - 1) : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count, rows: employees } = data;
  const totalPages = Math.ceil(count / limit);
  const currentPage = page ? +page : 1;
  const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;
  const nextPage = currentPage + 1 > totalPages ? null : currentPage + 1;
  const pagingData = {
    totalPages,
    currentPage,
    prevPage,
    nextPage,
    totalRecords: count,
    limit,
    employees: employees,
  };
  

   return pagingData;
};


// Retrieve all employees from the database.
const getAllEmployees = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Employee.findAndCountAll({
    limit,
    offset,
    order: [["id", "ASC"]],
  })
    .then((data) => {
      const pagingData = getPagingData(data, page, limit);
      res.status(200).send(pagingData);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees.",
      });
    });
};


//create employee
const createEmployee = async (req, res) => { 
 let info = {
   firstName: req.body.firstName,
   lastName: req.body.lastName,
   email: req.body.email,
   published: req.body.published?req.body.published:false
    };
    try {
       const employee = await Employee.create(info);
        res.status(200).send(employee);
    } catch (error) {
        res.status(400).send(error);
        
    }
   
}


module.exports = {
    createEmployee,
    getAllEmployees
}