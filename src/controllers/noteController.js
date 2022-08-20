const User = require('../models/User');
const Note = require('../models/Note');
const bcrypt = require('bcryptjs');

class NoteController {
    async createNote(req, res) {
        try {
            const { text } = req.body;
            if (!text) {
                return res.status(400).json({ message: 'Text is not provided' });
            }

            const newNote = new Note({
                text,
                userId: req.user.id
            });

            await newNote.save();

            return res.json({
                note: {
                    _id: newNote.id,
                    text: newNote.text,
                    completed: newNote.completed,
                    createdAt: newNote.createdAt
                },
                message: 'Success'
            });
        } catch (e) {
            console.log(e);
        }
    }

    async getNotes(req, res) {
        try {
            const { offset = 0, limit = 0 } = req.query;

            const notes = await Note.find({ userId: req.user.id }).skip(offset).limit(limit);

            return res.status(200).json({ offset, limit, count: notes.length, notes });
        } catch (e) {
            console.log(e);
        }
    }

    async getNote(req, res) {
        try {
            const _id = req.params.id;

            if (!_id) {
                return res.status(400).json({ message: 'id is not provided' });
            }

            const note = await Note.findOne({ _id });

            if (!note) {
                return res.status(400).json({ message: 'Note with such id does not exist' });
            }

            if (note.userId !== req.user.id) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            return res.json({ note });
        } catch (e) {
            console.log(e);
        }
    }

    async updateNote(req, res) {
        try {
            const _id = req.params.id;
            const { text } = req.body;
            if (!_id) {
                return res.status(400).json({ message: 'id is not provided' });
            }

            const note = await Note.findOne({ _id });

            if (!note) {
                return res.status(400).json({ message: 'Note with such id does not exist' });
            }

            if (note.userId !== req.user.id) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const editedNote = await Note.findByIdAndUpdate(_id, { text });

            return res.json({
                message: 'Success',
                note: {
                    text: editedNote.text,
                    completed: editedNote.completed,
                    createdAt: editedNote.createdAt,
                    updatedAt: editedNote.updatedAt
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    async changeCompletenessOfNote(req, res) {
        const _id = req.params.id;

        if (!_id) {
            return res.status(400).json({ message: 'id is not provided' });
        }

        const note = await Note.findOne({ _id });

        if (!note) {
            return res.status(400).json({ message: 'Note with such id does not exist' });
        }

        if (note.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await Note.findByIdAndUpdate(_id, { completed: !note.completed });

        return res.json({ message: 'Success' });
    }

    async deleteNote(req, res) {
        const _id = req.params.id;

        if (!_id) {
            return res.status(400).json({ message: 'id is not provided' });
        }

        const note = await Note.findOne({ _id });

        if (!note) {
            return res.status(400).json({ message: 'Note with such id does not exist' });
        }

        if (note.userId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await Note.findByIdAndDelete(_id);

        return res.json({ message: 'Success' });
    }
}

module.exports = new NoteController();
