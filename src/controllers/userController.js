const User = require('../models/User');
const Note = require('../models/Note');
const bcrypt = require('bcryptjs');

class UserController {
    async getUser(req, res) {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(403).json({ message: 'User is not authorized' });
            }
            return res.json({
                user: {
                    _id: user._id,
                    username: user.username,
                    createdDate: user.createdAt
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(403).json({ message: 'User is not authorized' });
            }
            await Note.deleteMany({ userId: user.id });
            await User.findOneAndDelete({ _id: user.id });

            return res.json({ message: 'success' });
        } catch (e) {
            console.log(e);
        }
    }

    async changePassword(req, res) {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(403).json({ message: 'User is not authorized' });
            }
            console.log('User: ', user);
            const { oldPassword, newPassword } = req.body;
            const isPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: `Wrong password` });
            }
            const hashedPassword = bcrypt.hashSync(newPassword, 7);
            console.log(bcrypt.compareSync(newPassword, hashedPassword));
            await User.findByIdAndUpdate(user.id, { password: hashedPassword });
            return res.json({ message: 'Success' });
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new UserController();
