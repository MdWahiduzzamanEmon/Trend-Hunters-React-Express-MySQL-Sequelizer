const express = require('express');
const app = express();
const cors = require('cors');

//middleware 
let corsOptions = {
    origin: 'http://localhost:8080',
}
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

global.__basedir = __dirname+'/../';

//routers
const router = require('./routes/employeeRoutes');
app.use('/api/employees', router);


//testing api
app.get('/', (req, res) => { 
    res.send({message: 'Hello Employees'});
});


//port
const port = process.env.PORT || 5000;


//server
app.listen(port, () => { 
    console.log(`Server started on port ${port}`);
});
