const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json())
app.use(helmet())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,

});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("DB CONNECTED FUCKBAG")
})

const playersRouter = require('./routes/players');
const challengesRouter = require('./routes/challenges');
const resultsRouter = require('./routes/results');
const archiveRouter = require('./routes/archives');
const userRouter = require('./routes/users');

app.use('/players', playersRouter);
app.use('/challenges', challengesRouter);
app.use('/results', resultsRouter);
app.use('/archives', archiveRouter);
// app.use('/users', userRouter);

const AuthController = require('./auth/AuthController');
app.use('/users/auth', AuthController);

module.exports = app;