const express = require('express');
const router = express.Router()
const multer = require('multer');
const path = require('path');

const Movies = require('../models/Movies')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        // Use a unique name for each uploaded file (e.g., timestamp + original filename)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension);
    },
});

const upload = multer({ storage: storage });


router.get('/', async(req, res) => {
    res.send({"foo": "bar"});
})

router.get('/movies-list', async(req, res) => {
    let movies = await Movies.find();
    
    res.render('movies-list', {movies})
})


router.get('/movies-add', async(req, res) => {

    // console.log(req.originalUrl)
    res.render('insert-movie', { msg: "Insert Movie" })
})

router.post('/movies-add', upload.single('imageUrl'), async(req, res) => {

    // console.log(req.originalUrl)
    const {title, year, duration} = req.body;
    const imageFileName = req.file ? req.file.filename : null;

    // console.log(req.body)
    // console.log(imageFileName)
    // console.log(req)
    // console.log(data)

    const Movie = new Movies({
        title,
        year,
        duration,
        imageUrl: `/uploads/${imageFileName}`
    })

    try {
        const saveMovie = await Movie.save();
        res.render('insert-movie', { msg: "Movie inserted" })
    } catch (error) {
        res.render('insert-movie', { msg: "Failed to upload movie information, please try again." })
    }
})


router.get('/movie/:id', async(req, res) => {
    try {
        const movie = await Movies.findById(req.params.id)
        console.log(movie)
        res.render('movie', {movie})
    } catch (error) {
        res.render('movies-list')
    }
})

module.exports = router