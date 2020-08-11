const Sequelize = require('sequelize')



// Db connection
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
})



db
    .authenticate()
    .then(() => {
        console.log('Db connected.....')

    })
    .catch(err => console.log(err))

db.sync()



module.exports = db  