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

    addUser(email, password, fname, lname, bio){
        let user = {
            "id": this.users.length,
            "email": email,
            "password": password,
            "fname": fname,
            "lname": lname,
            "bio": bio
        }

        this.users.push(user);
    }
}

module.exports = Database