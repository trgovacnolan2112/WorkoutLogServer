const Sequelize= require('sequelize');

const sequelize = new Sequelize('postgres://postgres:6655a365d362406995af1a41383ebb21@localhost:5432/workout-log');

module.exports = sequelize