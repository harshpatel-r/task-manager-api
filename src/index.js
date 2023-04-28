"use strict"
const express = require('express');
require('./db/mongoose.js');
// const User = require('./model/user');
// const Task = require('./model/task.js');
const userRouter = require("./routers/user");
const taskRouter = require('./routers/task');
const app = express();
const port = process.env.PORT;

// app.use((req, res, next) => {
//         res.status(503).send("this site is under maintenance. please try back soon...");
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

/*
const multer  = require("multer");
const upload = multer({
    "dest" : "images"
});

app.post("/upload", upload.single("upload"), (req, res)=> {

    res.send();
})
*/

app.listen(port, () => {
    console.log('server is up on port ' + port)
})