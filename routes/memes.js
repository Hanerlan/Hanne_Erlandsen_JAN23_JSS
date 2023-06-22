var express = require('express');
var router = express.Router();
const axios = require('axios');

const config = require ('../data/config.json');
const apiURL = config.API_URL;

let memesData = null;

// Fetch memes data from the API and store it in an object
async function fetchMemesData() {
    try {
        if(memesData === null) {
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
        res.render('memes', { title: 'Memes Overview', memesData: filteredMemes, searchQuery: searchQuery });
    } else {
        res.render('memes', { title: 'Memes Overview', memesData: memesData, searchQuery: '' })
    }
});

module.exports = router;