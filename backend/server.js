const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });

const Database = require("./Database")

var database = new Database();

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        const message = JSON.parse(data);
        var response = {
            error: 'Error Occurred: Event was not recognized'
        };
        if (message.event === 'search')
            response = searchLogic(message.query)
        else if (message.event === 'login') {
            response = loginRequest(message.email, message.password)
        }
        else if (message.event === 'register')
            response = { event: 'register',
                success: true
            }
        ws.send(JSON.stringify(response))
    });
});

//TODO Implement Search Logic

//TODO Takes in query string

//TODO Output is a JSON object of an ordered list of business objects

function searchLogic(query){

}

//TODO Implement Login Request
//TODO Takes in username and password
//TODO Searches whether email and password match users
//TODO If so, it sends back a JSON with a success and the user associated
//TODO If not, it sends back a JSON with an error message indicating the error
function loginRequest(email, password) {
    if (database.checkUser(email, password)){
        return {
            event: 'login',
            success: true,
            user: database.getUser(email, password)
        }
    }
    else{
        return {
            event: 'login',
            success: false,
            error: "User was not found: Email and/or password was incorrect"
        }
    }
}