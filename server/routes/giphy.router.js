const express = require('express');
const axios = require('axios');

const router = express.Router();

const API_KEY = process.env.API_KEY;

console.log('API_KEY: ', API_KEY);

const BASE_URL_GIPHY = 'api.giphy.com/v1/gifs/search';

module.exports = router;
