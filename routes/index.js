const express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { requireSignIn } = require('../conntrollers/auth');
const User = require('../models/User');

const router = express.Router()

router.get('/', (req, res) => {
    res.send("hii");
})

router.post('/login', async (req, res) => {
    await User.findOne({ email: req.body.emailL })
    .exec(async (err, user) => {
        if(err) return res.status(400).json({ err });

        if(user){
            if(await bcrypt.compareSync(req.body.passwordL, user.hash_password)){
                const token = jwt.sign({ _id: user._id }, "090480439", {expiresIn: '4h'});
                const { firstName, lastName, email, fullName } = user;
                res.status(200).json({
                    token,
                    user: { firstName, lastName, email, fullName }
                })
            }
            else{
                return res.status(400).json({ message: "Invalid Credentials!" })
            }
        } else{
            return res.status(400).json({ message: "User Does not exists!" })
        }
    })
})

router.post('/signup', (req, res) => {
    User.find({ $or: [
            { email: req.body.email },
            { username: req.body.userName }
        ]
    })
    .exec((err, user) => {
        if(user.length) return res.status(400).json({
            message: 'User Already Exists',
            data: user
        });

        const {firstName, lastName, username, email, password} = req.body;

        const hash_password = bcrypt.hashSync(password, 10);

        const _user =  new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            hash_password: hash_password,
            username: username
        })

        _user.save((err, data) => {
            if(err){
                return res.status(400).json({
                    message: "Something went wrong",
                    err: err
                })
            }
            if(data){
                return res.status(201).json({
                    message: "User created successfully!"
                })
            }
        })

    })
})

router.post('/profile', requireSignIn, (req, res) => {
    res.status(200).json({ user: 'profile' })
})

module.exports = router;