const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const appRoutes = require('./routes/routes.js');

const app = express();

app.use(express.json());
app.use('/api', appRoutes);

const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

console.log(PORT, DB_USER, DB_PASSWORD, DB_NAME);
const start = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.e5oo0dd.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
        );
        app.listen(PORT, () => console.log(`server started on ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
