const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose');
const app = express();

class main {


    constructor() {

        this.run();
        this.config();
        this.setRoutes()
    }


    async run() {
        try {
            await mongoose.connect('mongodb://localhost/JwtAuth',
                { useNewUrlParser: true, useUnifiedTopology: true });


            app.listen(process.env.PORT || 3000)
            console.log('Server is running on port 3000');
        } catch (error) {
            console.log(error)
        }
    }
    config() {
        app.use(bodyParser.json())
    }
    setRoutes() {
        app.use('/api', require('./routes/api'))

    }
}
module.exports = main;