const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require("nodemailer");
require("dotenv").config();
//middleware 
let corsOptions = {
    origin: 'http://localhost:3000',
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

//send email in nodemailer
app.post('/sendEmail', async (req, res) => {
  const { text, email, subject } = req.body;
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER_ID,
      pass: process.env.USER_PASS,
    },
  });
  await transport.sendMail({
    from: 'wahedemon09@gmail.com',
    to: email,
    subject: subject,
    html:text

  })
  res.status(200).send({ message: "email sent successfully" })
})

//port
const port = process.env.PORT || 5000;


//server
app.listen(port, () => { 
    console.log(`Server started on port ${port}`);
});
