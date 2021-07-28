const express = require('express');
const db = require('../db');
const update = require('../update');
const router = express.Router();
const googleTrends = require('google-trends-api');


router.get("/all", async (req, res, next) => {
    try {
        let results = await db.all();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get("/graphs", async (req,res,next) => {
    try {
        let results = await db.all();
        let obj = {};
        Object.keys(results[0]).map(key => {
            obj[key] = results.map(row => row[key]);
        });
        res.json(obj);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get("/trends", async (req,res,next) => {
    googleTrends.interestOverTime({keyword: 'bitcoin',startTime: new Date(1468713600*1000)}).then(result => {
        // console.log(JSON.stringify(res));
        const data = JSON.parse(result);
        // const vals = data.default.timelineData.map(obj => obj.value)
        res.json(data);
        // res.json(vals);
    }).catch(err => {
        console.log(err);
    });
});

router.get("/update", async (req,res,next) => {
    try {
        await update();
        res.json({
            status: "success"
        })
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
    
});

module.exports = router;