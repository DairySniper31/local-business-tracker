const fs = require('fs');

import userFile from "./database-json/users.json";
import reviewFile from "./database-json/reviews.json";
import businessFile from "./database-json/business.json"

class Database {

    constructor() {
        fs.readFile(userFile, (err, data) => {
            if (err) throw err;

            this.users = JSON.parse(data.toString());
        })
        fs.readFile(reviewFile, (err, data) => {
            if (err) throw err;

            this.reviews = JSON.parse(data.toString());
        })
        fs.readFile(businessFile, (err, data) => {
            if (err) throw err;

            this.businesses = JSON.parse(data.toString());
        })
    }
}

module.exports = Database