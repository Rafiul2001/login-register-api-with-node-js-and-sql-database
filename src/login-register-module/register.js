const express = require('express')
const bcrypt = require('bcryptjs')
const pool = require('../database-connection/mysql_database_connection')
const router = express.Router()

router.post('/', (req, res) => {
    const user_login_data = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone_no: req.body.phone
    }

    pool.query("SELECT `username` FROM `users` WHERE `username` = ?", [user_login_data.username], (err, rows, fields) => {
        if (err) { console.log(err) }
        if (rows.length > 0) {
            res.send({
                message: "Already registered with this username!",
                isValid: false
            })
        } else {
            const salt = bcrypt.genSaltSync(10)
            const encrpted_password = bcrypt.hashSync(user_login_data.password, salt)
            pool.query("INSERT INTO `users`(`username`, `password`, `email`, `phone_no`) VALUES (?,?,?,?)", [user_login_data.username, encrpted_password, user_login_data.email, user_login_data.phone_no], (err, rows, fields) => {
                if (err) { console.log(err) }
                res.send({
                    message: "Successfully registered!",
                    isValid: true
                })
            })
        }
    })

})

module.exports = router