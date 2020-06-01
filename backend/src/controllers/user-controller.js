const User = require('../models/user-model');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authentification');



module.exports = {

    async store(req, res) { //register

        //const{ email, senha} = req.body;
        const { email, username } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            // user = await User.create({email,senha});
            user = await User.create({ email });
        }

        return res.json(user);


    }
}
/*
    async authenticate(req, res) { // authenticate
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
              return res.status(400).json({ error: "User not found" });
            }

            if (!(await user.compareHash(password))) {
              return res.status(400).json({ error: "Invalid password" });
            }

            return res.json({
              user,
              token: user.generateToken()
            });
        } catch (err) {

            return res.status(400).json({ error: 'User authentication failed' });

        }
  try {

            if (await User.findOne({ email })) {
                return res.status(400).json({ error: 'User already exists' });
            }
            const user = await User.create(req.body);

            return res.json({ user });

        } catch (err) {

            return res.status(400).json({ error: 'User registration failed' });

        }
    },
    async get(req, res) { //get

        try {
            const { userId} = req;

            const user = await User.findById(userId);

            return res.json({user});
        } catch (err) {

            return res.status(400).json({error: 'Cant get user information'});
        }
    }
};
    let user = await User.findOne({ email});

    if(!user){
       // user = await User.create({email,senha});
       user = await User.create({email});
    }

    return res.json(user);
}*/
