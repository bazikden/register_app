const User = require('../models/user')
const UserInfo = require('../models/userinfo')
const sendEmail = require('../utils/sendmail')


const getAllConferences = async (req, res) => {
    const { page, order } = req.body
    const pageNumber = page !== undefined ? page : 1
    const limit = 3
    try {
        // const users = await User.findAll()
        // const arr = await Promise.all(users.map(async (user) => {
        //     const userInfo = await user.getUserInfos()
        //     return userInfo.map(info => {
        //         return { ...user.dataValues, ...info.dataValues }
        //     })
        // }))
        // arr.forEach(elem => confirences.push(...elem))
        const options = {
            page: pageNumber,
            paginate: 3,
        }
        console.log('order -------------------',order)
        order && (options.order = [order])

        console.log(options)
        const user = await UserInfo.findAll()
        console.log("----------------------------------------------------------------",user)
        const { docs, pages, total } = await UserInfo.paginate(options)

        console.log("DOCS----",docs)

        const confirences = await Promise.all(docs.map(async (info) => {
            const user = await info.getUser()
            return { ...user.dataValues, ...info.dataValues }
        }))


        res.json({ confirences, pages, total })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }


}

const saveConference = async (req, res) => {
    let id
    const { firstName, lastName, email, dateOfArival,
        dateOfDeparture, companyName, positionInCompany,
        role, sex, birthday, country } = req.body


    const user = await User.findAll({ where: { email } })
    if (user.length !== 0) {
        id = user[0].dataValues.id
    } else {
        const newUser = await User.create({
            firstName,
            lastName,
            email
        })

        id = newUser.dataValues.id
    }

    const userInfo = await UserInfo.create({
        UserId: id,
        dateOfArival,
        dateOfDeparture,
        companyName,
        position: positionInCompany,
        role,
        sex,
        birthday,
        country
    })

    userInfo && res.json({ success: true })
}

const setConfStatus = async (req, res) => {
    const { id, action } = req.body

    const elem = await UserInfo.findOne({ where: { id } })
    const result = await elem.update({ status: action })
    const data = {
        dateOfArival: result.dateOfArival,
        country: result.country,
        status: result.status
    }
    const sentEmail = await sendEmail(data)
    // console.log(sentEmail)

    res.json({ result, sentEmail })

}

module.exports = { getAllConferences, saveConference, setConfStatus }