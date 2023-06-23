var express = require('express');
var router = express.Router();
const axios = require('axios');

const config = require ('../data/config.json');
const apiURL = config.API_URL;

let memesData = [];

// Fetch memes data from the API and store it in an object
async function fetchMemesData() {
    try {
        if(memesData.length === 0) {
            const response = await axios.get(apiURL);
            memesData = response.data.data.memes;
            
            console.log('Memes data fetched and stored successfully!');
        }
    } catch (error) {
        console.error('Error fetching the memes data:', error);
    }
}

// GET memes overview page
router.get('/', async function (req, res, next) {
    await fetchMemesData();

    let searchQuery = req.query.search;
    if (searchQuery && searchQuery.trim() !== '') {
        let filteredMemes = memesData.filter(function (meme) {
            return meme.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
        });
        res.render('memesOverview', { 
            title: 'Memes Overview', 
            memesData: filteredMemes, 
            searchQuery: searchQuery,
            user: req.user  
        });
    } else {
        res.render('memesOverview', { 
            title: 'Memes Overview', 
            memesData: memesData, 
            searchQuery: '',
            user: req.user 
        })
    }
});

// POST request to fetch meme details
router.post('/', async function (req, res, next) {
    await fetchMemesData();

    let memeId = req.body.memeId; // Access the memeId from the request body
    let meme = memesData.find(function (meme) {
        return meme.id === memeId;
    });

    if (meme) {
        meme.viewed = true;
        res.render('memeDetails', { 
            title: 'Meme Details', 
            meme: meme, 
            user: req.user 
        });
    } else {
        res.status(404).send('Meme not found');
    }
});

// GET request to render meme details view
router.get('/:id', async function (req, res, next) {
    await fetchMemesData();

    let memeId = req.params.id;
    let meme = memesData.find(function (meme) {
        return meme.id === memeId;
    });

    if (meme) {
        if (req.user) {
            res.render('memeDetails', { 
                title: 'Meme Details', 
                meme: meme, 
                user: req.user 
            });
        } else {
            res.redirect('/login')
        }
    } else {
        res.status(404).send('Meme not found');
    }
});


module.exports = router;