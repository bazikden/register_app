const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const Admin = require('../models/admin')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization
    console.log(token)
    if (token !== undefined) {
        try{
        const data = await jwt.verify(token, JWT_SECRET)
        const userData = await Admin.findAll({ where: { email: data.email } })
        const user = userData[0].dataValues
        req.user = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
            isSuperAdmin: user.isSuperAdmin

        }
        next()
        } catch(error){
            res.status(500).json({error})
        }
        
    } else {
        res.status(401).json({ msg: "Unauthorized" })
        next()
    }

}