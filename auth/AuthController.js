const router = require('express').Router();
const bodyParser = require('body-parser');
let User = require('../models/users.model');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

router.post('/register', function (req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 13);

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem registering the user.")
            // create a token
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        });
});

router.post('/login', function (req, res) {

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
    });

}); 

module.exports = router;