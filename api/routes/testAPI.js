const csv = require('csv-parser');
const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const csvData = [];

    fs.createReadStream('./csv/small.csv')
        .pipe(csv())
        .on('data', (row) => {
            csvData.push(row);
            console.log(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            console.log(csvData);
            if (csvData.length > 0) {
                res.status(200).send({
                    message: 'CSV read correctly',
                    data: csvData,
                });
            } else {
                res.status(503).send({
                    message: 'Error reading CSV',
                    data: [],
                });
            }
        });
});

module.exports = router;
