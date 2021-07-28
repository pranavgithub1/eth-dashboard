const axios = require('axios');

module.exports = axios.create({
    baseURL: "https://api.glassnode.com/v1/metrics"
})

