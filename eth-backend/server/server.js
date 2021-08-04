const update = require('./update');
const express = require("express");
const apiRouter = require('./routes');
var cfg = require('../../config');
const app = express();
const port = cfg.myapi.port;
var cors = require('cors');
var cron = require('cron');
app.use(cors());
app.use(express.json());
// app.use(update);
app.use('/api/v1', apiRouter)

var job = new cron.CronJob({
    cronTime: '0 0 1 * * *',
    onTick: function() {
        console.log("updating",(new Date()).toLocaleDateString());
        update();
    }
});
job.start();

app.listen(port,'0.0.0.0', () => console.log(`Example app listening on port ${port}`));

