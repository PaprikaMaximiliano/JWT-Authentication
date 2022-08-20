const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateAccessToken = (username, id) => {
    const payload = { username, id };
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class AuthController {
    async registration(req, res) {
        try {
            const { username, password } = req.body;
            const userExists = await User.findOne({ username });
            if (userExists) {
                return res.status(400).json({ message: ' User with this username already exists' });
            }
            const hashedPassword = bcrypt.hashSync(password, 7);
            const user = new User({ username, password: hashedPassword });
            await user.save();
            return res.json({ message: 'Success' });
        } catch (e) {
            console.log(e);
        }
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res
                    .status(400)
                    .json({ message: `User ${username} username does not exist` });
            }
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: `Wrong password` });
            }

            const jwt_token = generateAccessToken(user.username, user._id);
            return res.json({ message: 'Success', jwt_token });
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new AuthController();
