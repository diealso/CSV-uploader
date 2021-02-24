const csv = require('csv-parser');
const fs = require('fs');
const express = require('express');
const router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './csv/subidos/' });

router.post('/', upload.single('csvFile'), function (req, res, next) {
    const csvData = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (row) => {
            console.log('Leido - ' + row);
            csvData.push(row);
        })
        .on('end', () => {
            console.log('finalizado');
            if (csvData.length > 0) {
                res.status(200).send({
                    message: 'CSV read correctly',
                    data: csvData,
                });
            } else {
                res.status(500).send({
                    message: 'Error reading CSV',
                    data: csvData,
                });
            }
        });
});

module.exports = router;
