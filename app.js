const express = require('express');
const ExpressError = require('./expressError')

const app = express();

function validate(req) {
    const numsString = req.query.nums;
    if (numsString === undefined) throw new ExpressError("nums are required", 400);
    const numsStringArray = numsString.split(",");
    for (num in numsStringArray) {
        if (isNaN(parseInt(numsStringArray[num]))) throw new ExpressError(`${numsStringArray[num]} is not a number`, 400);
    }
    return numsStringArray;
}

function getMean(numsStringArray) {
    var sum = 0;
    var count = 0;
    for (num in numsStringArray) {
        count += 1;
        sum += parseInt(numsStringArray[num]);
    }
    const mean = sum / count;
    return mean;
}

function getMedian(numsStringArray) {
    const numsArray = [];
    for (num in numsStringArray) {
        numsArray.push(parseInt(numsStringArray[num]));
    }
    numsArray.sort((a, b) => (a - b));
    var median = null;
    if (numsArray.length % 2 === 1) {
        median = numsArray[Math.floor(numsArray.length / 2)];
    }
    else {
        const high = numsArray[numsArray.length / 2];
        const low = numsArray[(numsArray.length / 2) - 1];
        median = (high + low) / 2;
    }
    return median;
}

function getMode(numsStringArray) {
    const numsObj = {};
    var most = 0;
    for (num in numsStringArray) {
        if (numsObj[numsStringArray[num]]) {
            numsObj[numsStringArray[num]] += 1;
            if (numsObj[numsStringArray[num]] > most) {
                most = numsObj[numsStringArray[num]];
            }
        }
        else {
            numsObj[numsStringArray[num]] = 1;
        }
    }
    var mostArray = [];
    for (num in numsObj) {
        if (numsObj[num] === most) {
            mostArray.push(parseInt(num));
        }
    }
    return mostArray;
}

app.get("/mean", function (req, res, next) {
    try {
        const numsStringArray = validate(req);
        const mean = getMean(numsStringArray);
        return res.json({
            "operation" : "mean",
            "value" : mean
        });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
})

app.get("/median", function (req, res, next) {
    try {
        const numsStringArray = validate(req);
        const median = getMedian(numsStringArray);
        return res.json({
            "operation" : "median",
            "value" : median
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
})


app.get("/mode", function (req, res, next) {
    try {
        const numsStringArray = validate(req);
        const mostArray = getMode(numsStringArray);
        return res.json({
            "operation" : "mode",
            "value" : mostArray
        });
    } catch (e) {
        console.log(e);
        next(e);
    }
})

app.get("/all", function (req, res, next) {
    try {
        const numsStringArray = validate(req);
        const mean = getMean(numsStringArray);
        const median = getMedian(numsStringArray);
        const mostArray = getMode(numsStringArray);
        return res.json({
            "operation" : "all",
            "mean" : mean,
            "median" : median,
            "mode" : mostArray
        })
    } catch (e) {
        console.log(e);
        next(e);
    }
})

// If no other route matches, respond with a 404
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    next(e);
})


// Error handler
app.use(function (err, req, res, next) { //Note the 4 parameters!
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.msg;

    // set the status and alert the user
    return res.status(status).send(`${status} error: ${message}`);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});




