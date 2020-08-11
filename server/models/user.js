'use strict';
const db = require('../utils/utils')
const Sequelize = require('sequelize')
const UserInfo = require('./userinfo')
const sequelizePaginate = require('sequelize-paginate')

const User = db.define('User', {
    firstName: Sequelize.DataTypes.STRING,
    lastName: Sequelize.DataTypes.STRING,
    email: { type: Sequelize.DataTypes.STRING, unique: true }
}, {});

sequelizePaginate.paginate(User)

User.hasMany(UserInfo)
UserInfo.belongsTo(User)

module.exports = User

