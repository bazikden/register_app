const db = require('../utils/utils')
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')

const instanceMethods = {
    generateToken: async function (data) {
        return await jwt.sign(data, JWT_SECRET)
    },
    comparePasswords: async function (password, hashedPassword) {
        const match = await bcrypt.compare(password, hashedPassword)
        return match
    },
    hashPassword: async function(password){
        return await bcrypt.hash(password,10)
    }

}

const Admin = db.define('Admin', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    active:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    password: DataTypes.STRING,
    isAdmin: {
        type:DataTypes.BOOLEAN,
        defaultValue:true
    },
    isSuperAdmin: {
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
}, { instanceMethods })

Admin.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword;
});



module.exports = Admin