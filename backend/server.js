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
        else if (message.event === 'login')
            // response = loginRequest(message.email, message.password)
            response = {
                event: 'login',
                success: true,
                user: {
                    name: 'User123'
                }
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
    if(query == "Ice Cream"){
        return iceCreamTest.json;
    }

}

//TODO Implement Login Request
//TODO Takes in username and password
//TODO Searches whether email and password match users
//TODO If so, it sends back a JSON with a success and the user associated
//TODO If not, it sends back a JSON with an error message indicating the error
function loginRequest(email, password) {

}