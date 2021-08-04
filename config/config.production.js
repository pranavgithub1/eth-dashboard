var config = require('./config.development');

config.env = 'production';
config.myapi.host = 'production server public ip';

module.exports = config;