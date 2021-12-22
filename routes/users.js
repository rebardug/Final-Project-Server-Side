const router = require('express').Router();
const User = require('../models/UserSchema');
const ErrorResponse = require('../utils/errorResponse');
const bcrypt = require('bcrypt');

//PUT
//update a user
router.put("/:id", async (req, res, next) => {
    if (req.user._id === req.params.id || req.user.userType === "admin") {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error)
        }
    } else {
        return next(new ErrorResponse("You can update only your account!", 403))
    }
});

//DELETE
//delete a user
router.delete("/:id",  async (req, res, next) => {
    if (req.user._id === req.params.id || req.user.userType === "admin") {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("user has been deleted");
        } catch (error) {
            next(error)
        }
    } else {
        return next(new ErrorResponse("You can delete only your account!", 403))
    }
});

//GET
//get user specific by email
router.get("/exists/email/:email", async (req, res,next) => {
    const user = await User.findOne({ email: req.body.email })
    const { password, ...others } = user._doc;
    res.status(200).json(others);
});

//GET
//get user specific by id
router.get("/id/:id", async (req, res,next) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET
//get user specific by email
router.get("/email/:email", async (req, res,next) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET
//get all admins
router.post('/admin', async (req, res, next) => {
    

    if (req.body.CurrentUser.userType === "admin") {
        //console.log(req.body);
        try {
            const users= await User.find({userType:'admin'})
            res.status(200).json(users);
            //console.log(users);
        } catch (error) {
            next(error)
        }
    } else {
        return next(new ErrorResponse("You are not allowed to see all admins!", 403))
    }
});

router.post('/user', async (req, res, next) => {
        if (req.body.CurrentUser.userType === "admin") {
            try {
                const users= await User.find({userType:'user'})
                res.status(200).json(users);
            } catch (error) {
                next(error)
            }
        }else
        return next(new ErrorResponse("You are not allowed to see all users!", 403))
    
});
router.post('/stats', async (req, res, next) => {
    if (req.body.CurrentUser.userType === "admin"||req.body.CurrentUser.userType === "user") {        
        try {
            const users= await User.find({userType:'user'}).sort({points: -1})
            console.log(users)
            res.status(200).json(users);
        } catch (error) {
            next(error)
        }
    }else
    
    return next(new ErrorResponse("You are not allowed to see statistics", 403))

});
router.post('/changePermission', async (req, res, next) => {
    if (req.body.CurrentUser.userType === "admin") {        
        try {
            // const users= await User.find({email: req.body.email})
            // const update = { userType: "user" };
            // users.updateOne(update);
            const users = await User.findOneAndUpdate(
                { email: req.body.email },
                { userType: "user" },
                { new: false }
            );
            console.log(users)
            res.status(200).json(users);
        } catch (error) {
            next(error)
        }
    }else
    
    return next(new ErrorResponse("You are not allowed to see statistics", 403))

});
router.post('/changePoints', async (req, res, next) => {
    if (req.body.currentUser.userType === "admin") {        
        try {
            // const users= await User.find({email: req.body.email})
            // const update = { userType: "user" };
            // users.updateOne(update);
            const users = await User.findOneAndUpdate(
                { email: req.body.email },
                { points: req.body.num },
                { new: false }
            );
            console.log(users)
            res.status(200).json(users);
        } catch (error) {
            next(error)
        }
    }else
    
    return next(new ErrorResponse("You are not allowed to see statistics", 403))

});

router.get('/all', async (req, res, next) => {console.log("we are home")})
module.exports = router;