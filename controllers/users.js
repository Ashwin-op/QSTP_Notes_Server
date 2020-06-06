const user = require('../models/users');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    // Create a new user
    registerUser: (req, res, next) => {
        user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, err => {
            if (err)
                next(err);
            else
                res.json({
                    status: "Success",
                    message: `User ${req.body.name} registered!`,
                    data: null
                });

        });
    },

    // Authenticate an existing user
    loginUser: (req, res, next) => {
        user.findOne({
            email: req.body.email
        }, (err, userInfo) => {
            if (err) {
                next(err);
            } else {
                if (bCrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({
                        id: userInfo._id
                    }, req.app.get('secretKey'), {
                        expiresIn: '1h'
                    });

                    res.json({
                        status: "Success",
                        message: `Welcome back ${userInfo.name}`,
                        data: {
                            user: userInfo,
                            token: token
                        }
                    });
                } else {
                    res.json({
                        status: "Error",
                        message: "Invalid email/password!",
                        data: null
                    });
                }
            }
        });
    },
}
