const fs = require('fs');

class Database {

    constructor() {
        fs.readFile("./database-json/users.json", (err, data) => {
            if (err) throw err;

            this.users = JSON.parse(data.toString());
        })
        fs.readFile("./database-json/reviews.json", (err, data) => {
            if (err) throw err;

            this.reviews = JSON.parse(data.toString());
        })
        fs.readFile("./database-json/business.json", (err, data) => {
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

    addBusiness(name, address, website, phone, start, end, regulations){
        let business = {
            "id": this.businesses.length,
            "name": name,
            "address": address,
            "website": website,
            "phone": phone,
            "hours": {
                "start": start,
                "end": end
            },
            "regulations": regulations
        }

        this.businesses.push(business)
    }

    addReview(userID, businessID, rating, description){
        let review ={
            "userID": userID,
            "businessID": businessID,
            "rating": rating,
            "description": description
        }

        this.reviews.push(review)
    }

    checkUser(email, password){
        let user;
        for (user in this.users){
            if (user.email === email && user.password === password)
                return true
        }
        return false
    }

    getUser(email, password){
        let user;
        for (user in this.users){
            if (user.email === email && user.password === password)
                return user
        }
        return {
            "error": "User not found"
        }
    }
}

module.exports = Database