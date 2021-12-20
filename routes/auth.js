const router = require("express").Router();
const User = require('../models/UserSchema')
const Task = require('../models/TaskSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse');
// const crypto = require('crypto');

// @route - /api/auth

//POST
//register a new user
router.post('/register', async (req, res, next) => {
    console.log(req.body)
    if (!req.body.email || !req.body.password || !req.body.name)
        return next(new ErrorResponse('missing fields', 400))
    try {
        //check if email already exists
        const emailExist = await User.findOne({ email: req.body.email })
        if (emailExist)
            return next(new ErrorResponse('Email already exists'), 400)

        //hash pass
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt)

        //add new User
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPass,
            phoneNumber: req.body.phone,
            points: req.body.points
        })
        const user = await newUser.save();
        // const { password, ...others } = user._doc;
        console.log("registered: ",user);
        res.status(201).json({
            success: true,
            successMessage: "registration success. please Log in"
        })
    } catch (error) {
        next(error)
    }
})
//POST
//login user
router.post('/login',async (req, res, next) => {
    console.log(req.body);
    if (!req.body.email || !req.body.password)
        return next(new ErrorResponse('missing fields', 400))
    try {
        //check if email is in database
        const user = await User.findOne({ email: req.body.email })
        if (!user)
            return next(new ErrorResponse('Email not found'), 400)

        //check if password correct
        const validate = await bcrypt.compare(req.body.password, user.password)
        if (!validate)
            return next(new ErrorResponse('invalid password!', 400))
        //// res.status(200).json(others)
        //jwt token
        const accessToken = jwt.sign({ _id: user._id, userType: user.userType },
            process.env.SECRET,
            { expiresIn: "1d" }
        )
        const { password,...info } = user._doc;
        res.status(201).json({
            ...info,accessToken:accessToken
        })
    } catch (err) {
        next(error)
    }
})

router.post('/tasks', async (req, res, next) => {
    if (req.body.CurrentUser.userType === "admin"||req.body.CurrentUser.userType === "user") {        
        try {
            const tasks= await User.find({})
            res.status(200).json(tasks);
        } catch (error) {
            next(error)
        }
    }else
    
    return next(new ErrorResponse("You are not allowed to see tasks", 403))
    // if (req.body.currentUser.userType === "admin"||req.body.currentUser.userType === "user") { 
    //     try {
    //         const tasks= await Task.find({})
    //         res.status(200).json(tasks);
    //     } catch (error) {
    //         next(error)
    //     }
    // } else
    // return next(new ErrorResponse("You are not allowed to see all tasks!", 403))

});

router.post('/setTask', async (req, res, next) => {
    console.log(req.body)
    try {
        //check if email already exists
        const taskExist = await Task.findOne({ Description: req.body.description})
        if (taskExist)
            return next(new ErrorResponse('Task already exists'), 400)
        //add new User
        const newTask = new Task({
            Description: req.body.description
        })
        const task = await newTask.save();
        // const { password, ...others } = user._doc;
        console.log("Task added: ",task);
        res.status(201)
    } catch (error) {
        next(error)
    }
})


//POST
//forgot password
router.post('/forgotPassword',async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) return next(new ErrorResponse("Email could not be sent", 404))
        const resetToken = crypto.RandomBytes(20).toString("hax");
    } catch (error) {
        next(error)
    }

})

module.exports = router