module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('employees', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
return Employee;
};