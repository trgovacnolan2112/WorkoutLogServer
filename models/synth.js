const {DataTypes} = require('sequelize');
const db = require('../db');
const Synth = db.define('synth',{
    nameOfSynth: {type: DataTypes.STRING,allowNull: false, unique:true},
    baseOfSynth: {type: DataTypes.INTEGER,allowNull: false},
    skin: {type: DataTypes.STRING,allowNull: false},
    eyes: {type: DataTypes.STRING,allowNull: false},
    hair: {type: DataTypes.STRING,allowNull: false},
    height: {type: DataTypes.INTEGER,allowNull: false}
});
module.exports = Synth;