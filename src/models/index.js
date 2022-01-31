const dbConfig = require('../config/dbConfig');
const {Sequelize,DataTypes} = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false, //overrides all error messages with sequelize
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

sequelize.authenticate()
    .then(() => {
        console.log("connected....")
    })
    .catch(err => { 
        console.log("error connecting: ", err)
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employeesTable = require('./employees.js')(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => { //force: true will drop the table if it already exists
    console.log("re-sync done!,Database & tables created!");
});

module.exports = db;

