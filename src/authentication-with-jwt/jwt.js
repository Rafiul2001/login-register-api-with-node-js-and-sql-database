const jsonWebToken = require('jsonwebtoken')

const privateKey = 'Signed'

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.send({
            message: "Unauthorized",
            isValid: false
        })
    }
    try {
        const decoded = jsonWebToken.verify(token.replace('Bearer ', '').toString(), privateKey);
        req.tokenData = decoded
        next();
    } catch (error) {
        return res.send({
            message: "Invalid token",
            isValid: false
        })
    }
}

module.exports = {
    jsonWebToken: jsonWebToken,
    privateKey: privateKey,
    verifyToken: verifyToken
}