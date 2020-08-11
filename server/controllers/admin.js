const Admin = require('../models/admin')

const getAllUsers = async (req, res) => {
    const users = await Admin.findAll()
    res.json({ users })
}

const saveNewUser = async (req, res) => {
    try {
        const newUser = await Admin.create(req.body)
        res.json({ newUser })
    } catch (error) {
        res.status(500).json({ msg: "Server Error", error })
    }

}

const updateUser = async (req, res) => {

    const { email, oldPassword, newPassword, firstName, lastName } = req.body
    const user = await Admin.findOne({where:{email}})
    const match = await Admin.options.instanceMethods.comparePasswords(oldPassword, user.dataValues.password)
    if(match){
        const password =  await Admin.options.instanceMethods.hashPassword(newPassword)
        console.log(password)
        const data = {
            firstName,
            lastName,
            password
        }
        const updated = await Admin.update(data,{where:{email}})
        res.json({updated})
    }else {
        res.status(400).json({error:"Old password is not correct"})
    } 
}

const updateUserStatus = async(req,res) => {
    console.log("update",req.body)
    const {email, active} = req.body
    const updated = await Admin.update({active},{where:{email}})
    res.json({updated:true})
}

const delUser = async(req,res) => {
    console.log('delete',req.body)
    await Admin.destroy({where:{email:req.body.email}})
    res.json({success:true})
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    const admin = await Admin.findAll({})
    if(admin.length === 0){
        try {
            await Admin.create({
                "email":"admin@mail.com",
                "password":"admin",
                "isAdmin":"true",
                "isSuperAdmin":"true"
            })
            
        } catch (error) {
            res.status(500).json({error})    
        }
   }

    try {
        const user = await Admin.findAll({ where: { email } })
        if (user.length !== 0) {
            const match = await Admin.options.instanceMethods.comparePasswords(password, user[0].dataValues.password)
            if (match) {
                const token = await Admin.options.instanceMethods.generateToken({ email, password })
                res.cookie("token", token).json({ success: true, token })

            } else {
                res.status(400).json({ msg: 'Invalid creadentials' })
            }
        } else {
            res.status(400).json({ msg: 'Invalid Creadentials' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server Error", error })
    }

}



const authUser = async (req, res) => {
    try {
        req.user !== undefined && res.json({ user: req.user })
    } catch (error) {
        res.status(500).json({ msg: 'Sever Error', error })
    }
}




module.exports = { getAllUsers, saveNewUser, loginUser, authUser, updateUser, updateUserStatus, delUser }