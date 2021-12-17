const express = require("express");
const verify = require("../middleware/verifyToken");
const router = express.Router()
const Chat = require('../models/chatSchema')

//GET
//get all chats
router.get('/', verify, async (req, res, next) => {
    try {
        const chats = await Chat.find();
        res.json(chats)
    } catch (error) {
        next(error)
    }
})

router.post('/', verify, async (req, res, next) => {
        const chat = new Chat({
            sender: req.body.sender,
            receiver: req.body.receiver,
            message:req.body.message
        })
        try {
            const savedChat = await chat.save();
            res.json(savedChat);
        } catch (err) {
            res.json({ message: err })
        }
    
});