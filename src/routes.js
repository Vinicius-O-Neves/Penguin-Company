const DateExtension = require('./common/scripts/DateExtension.js');
const GenerationExtension = require('./common/scripts/GenerationExtension.js');

const nodeConfiguration = require('./nodeConfiguration.js');
const app = new nodeConfiguration().init();

const DB = require('./database/server.js');
const database = new DB();

let userId;
let $ = require('cheerio').load('passGeneratedScreen/index.html');
$('pass_generate').replaceWith(`<h1>${userId}</h1>`);

app.get('/buy', (req, res) => {
    res.sendFile(__dirname + '/pages/purchase/buyScreen/index.html');
});

app.post('/rules', async (req, res) => {
    let dateExtension = new DateExtension();
    userId = new GenerationExtension().makeId(6);

    res.sendFile(__dirname + '/pages/purchase/rulesScreen/index.html');

    await database.createUserTicket(
        userId,
        dateExtension.getDate(),
        2,
        req.body["modality"]
    );
    await database.createAmountOfTickets(
        userId,
        req.body["type"]
    );
})

app.get('/ticketGenerenated', (req, res) => {
    res.sendFile(__dirname + '/pages/purchase/passGeneratedScreen/index.html')
})