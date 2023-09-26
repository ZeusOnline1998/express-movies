const mongoose = require('mongoose');

const MoviesSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    year: {
        type: Number,
        required: true,
    },
    duration: {
        type: String,
    }
})

module.exports = mongoose.model('movies', MoviesSchema);