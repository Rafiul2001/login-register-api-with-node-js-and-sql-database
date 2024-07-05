const express = require('express')
const bcrypt = require('bcryptjs')
const pool = require('../database-connection/mysql_database_connection')
const jwt = require('../authentication-with-jwt/jwt')
const router = express.Router()

router.post('/', (req, res) => {
    const user_login_data = {
        username: req.body.username,
        password: req.body.password
    }

    pool.query("SELECT `user_id`, `username`, `password`, `email`, `phone_no` FROM `users` WHERE `username` = ?", [user_login_data.username], async (err, rows, fields) => {
        if (err) { console.log(err) }
        if (rows.length > 0) {
            const check_password = await bcrypt.compare(user_login_data.password, rows[0].password)
            console.log(check_password)
            if (check_password) {
                const token = jwt.jsonWebToken.sign({ user_id: rows[0].user_id }, jwt.privateKey, { expiresIn: '1h' })
                const bearer_token = "Bearer " + token
                res.send({
                    token: bearer_token,
                    isValid: true
                })
            } else {
                res.send({
                    message: "Incorrect Password!",
                    isValid: false
                })
            }
        } else {
            res.send({
                message: "User not found!",
                isValid: false
            })
        }
    })
})

module.exports = router