'use strict';
const db = require('../utils/utils')
const Sequelize = require('sequelize')
const User = require('./user')
const sequelizePaginate = require('sequelize-paginate')

const UserInfo = db.define('UserInfo', {
  dateOfArival: Sequelize.DataTypes.DATE,
  dateOfDeparture: Sequelize.DataTypes.DATE,
  companyName: Sequelize.DataTypes.STRING,
  position: Sequelize.DataTypes.STRING,
  role: Sequelize.DataTypes.STRING,
  sex: Sequelize.DataTypes.STRING,
  birthday: Sequelize.DataTypes.DATE,
  country: Sequelize.DataTypes.STRING,
  status: {
    type:Sequelize.DataTypes.STRING,
    defaultValue:'new'
  }
}, {});

UserInfo.belongsTo(User)

sequelizePaginate.paginate(UserInfo)

module.exports = UserInfo