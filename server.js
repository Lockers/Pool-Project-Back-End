const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
app.use(helmet())


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("DB CONNECTED FUCKBAG")
})

const playersRouter = require('./routes/players');
const challengesRouter = require('./routes/challenges');


app.use('/players', playersRouter);
app.use('/challenges', challengesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})


