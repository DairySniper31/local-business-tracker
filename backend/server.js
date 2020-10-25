const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        const message = JSON.parse(data);
        var response = {
            error: 'Error Occurred: Event was not recognized'
        };
        if (message.event === 'search')
            response = searchLogic(message.query)
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