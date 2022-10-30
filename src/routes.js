const DateExtension = require('./common/scripts/DateExtension.js');
const GenerationExtension = require('./common/scripts/GenerationExtension.js');

const nodeConfiguration = require('./nodeConfiguration.js');
const app = new nodeConfiguration().init();

const DB = require('./database/server.js');
const database = new DB();

let userId, modality, type, date;

app.get('/buy', (req, res) => {
    res.sendFile(__dirname + '/pages/purchase/buyScreen/index.html');
});

app.post('/rules', async (req, res) => {
    let dateExtension = new DateExtension();
    userId = new GenerationExtension().makeId(6);
    modality = req.body["modality"];
    date = dateExtension.getDate();
    type = req.body["type"];

    res.sendFile(__dirname + '/pages/purchase/rulesScreen/index.html');

    await database.createUserTicket(
        userId,
        date,
        2,
        modality
    );
    await database.createAmountOfTickets(
        userId,
        type
    );
})

app.get('/ticketGenerenated', async(req, res) => {
    res.sendFile(__dirname + '/pages/purchase/passGeneratedScreen/index.html');
});

app.post('/ticketGenerenated', async(req, res) => {
    res.send([modality, type, date, userId]);
});