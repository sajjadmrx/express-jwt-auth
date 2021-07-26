const express = require('express')

const app = express();

class main {


    constructor() {

        this.run();
        this.config();
    }


    run() {
        app.listen(process.env.PORT || 3000)
        console.log('Server is running on port 3000');
    }
    config() {
        app.use('/api', (req, res) => {
            res.send('Hello World!')
        })
    }

}
module.exports = main;