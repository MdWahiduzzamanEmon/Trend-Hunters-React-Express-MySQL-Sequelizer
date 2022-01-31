const employeeController = require('../controllers/employeeController');
const csvController = require('../controllers/csvController');
const router = require('express').Router();
const upload = require('../middlewares/upload');

//single employee
router.post("/createEmployee", employeeController.createEmployee);

//multiple employees with csv
router.post(
  "/createMultipleEmployee",
  upload.single("file"),
  csvController.multipleDataUpload
);

//get all employees
router.get("/getAllEmployees", employeeController.getAllEmployees);

module.exports = router;