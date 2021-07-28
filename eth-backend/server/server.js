const update = require('./update');
const express = require("express");
const apiRouter = require('./routes');

const app = express();
const port = 5000;
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

app.listen(port, () => console.log(`Example app listening on port ${port}`));

// check in git code
// check out in server 
// install mysql on server
// create 2 launchd services : 1 for web (port 80)   other for the background worker
// install node and git
/*
    letsencrypt




*/