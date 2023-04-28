const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../model/user");
const auth = require("../middleware/auth");
const Task = require('../model/task');
const {sendWelcomeEmail, sendCancelationEmail} = require('../email/account') 

const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        sendWelcomeEmail(user.email, user.name);
        res.status(201).send({user,token});

    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }

    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/user/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();

        res.send();
    }catch (e) {
        res.status(500).send()
    }
})

router.post('/user/logoutall', auth, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);

    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

/*
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).send('bad request');
        }

        res.send(user);
    } catch (e) {
        res.status(500).send();
    }

    //     User.findById(_id).then((user) => {
    //         if (!user) {
    //             return res.sendStatus(404)
    //         }
    //         res.send(user);
    //     }).catch((e) => {
    //         console.log(e);
    //         res.send(e)
    //     })
})
*/

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "age", "password", "email"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid Updates!" });
    }

    try {
      
        updates.forEach((update) => req.user[update] = req.body[update]);

        await req.user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        // if (!user) {
        //     return res.sendStatus(404);
        // }
        
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findByIdAndDelete(req.user._id);
        if (!user) {
            return res.sendStatus(404);
        }
        sendCancelationEmail(user.email, user.name);
        const task = await Task.deleteMany({owner : id });
        // // console.log(req.user)
        // await req.user.remove();
        
        res.status(200).send(user); 
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
})

const upload = multer({
    limits : {
        fileSize : 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/gmi)){
            return cb(new Error("please upload an image file"));
        }

        cb(undefined, true);
        //cb(new Error('file must be a pdf'))
        // cd(undefined, true)
        // cd(undefined, false)
    }
})

router.post('/users/me/avatar', auth, upload.single("avatar"), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save()
    res.send()
},(error, req, res, next) => {
    res.status(400).send({error : error.message})
});

router.delete('/users/me/avatar', auth, async(req, res) => {
    try{
        req.user.avatar = undefined;
        await req.user.save();
        res.send()
    } catch (e) {
        res.send(500).send()
    }
})

router.get('/users/:id/avatar', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);

        if(!user || !user.avatar){
            throw new Error();
        }

        res.set("Content-Type", "image/png");
        res.send(user.avatar);

    } catch (e) {
        res.status(404).send();
    }
})

module.exports = router;
