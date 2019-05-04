/* eslint-disable no-console,no-unused-vars */
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
mongoose
    .connect("mongodb://localhost:27017/temp", {
        useNewUrlParser: true
    })
    .then(
        () => {
            console.info("Connected")
        },
        error => {
            console.info("MongoDB connection error" + error);
            process.exit(0)
        }).then(
    function () {

        const markdownFileModel = mongoose.model('MarkdownFileModel', {
            fileName: String,
            fileContent: String
        });

        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Access-Control-Allow-Origin');

            next();
        });

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.post('/save', (request, response) => {
            markdownFileModel.findOneAndUpdate({
                fileName: request.body.title
            }, {
                fileContent: request.body.content
            }, {
                upsert: true
            }, function (err) {
                if (err) {
                    console.log(err);
                    return response.send(err);
                } else {
                    return response.sendStatus(200);
                }
            });
        });

        app.get('/load', function (request, response, next) {
            markdownFileModel.find({}, function (err, res) {
                if (err) {
                    console.log(err);
                    return response.send(err);
                } else {
                    return response.json(res);
                }
            });
        });

        app.get('/delete', function (request, response, next) {
            markdownFileModel.deleteOne({fileName: request.body.title}, function (err) {
                if (err) {
                    console.log(err);
                    return response.send(err);
                } else {
                    return response.sendStatus(200);
                }
            });
        });


        app.get(function (request, response) {
            response.status(404).sendStatus(404);
        });

        app.use(function (request, response, next) {
            response.status(500).sendStatus(500);
        });

        app.listen(8000);

    }
);
