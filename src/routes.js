const DateExtension = require('./common/scripts/DateExtension.js');
const GenerationExtension = require('./common/scripts/GenerationExtension.js');
const RechargeId = require('./pages/recharge/searchCardScreen/scripts/searchCardScreen.js');

const nodeConfiguration = require('./nodeConfiguration.js');
const app = new nodeConfiguration().init();

const DB = require('./database/server.js');
const { BIND_IN, BIND_OUT } = require('oracledb');
const database = new DB();

var rechargeUser, amountTicket;
let userId, date, idTicket, type;
var modality;

app.get('/buy', (req, res) => {
    res.sendFile(__dirname + '/pages/purchase/buyScreen/index.html');
});

app.post('/rules', async (req, res) => {
    
    userId = new GenerationExtension().makeId(6);
    modality = req.body["modality"];
    
    type = req.body["type"];

    res.sendFile(__dirname + '/pages/purchase/rulesScreen/index.html');

    
})

app.post('/ticketGenerenated', async(req, res) => {
    let dateExtension = new DateExtension();
    date = String(dateExtension.getDatetime());
    res.sendFile(__dirname + '/pages/purchase/passGeneratedScreen/index.html');

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
});

app.get('/ticketGenerenated', async(req, res) => {
    res.send([modality, type, date, userId]);
});



app.get('/searchCard', (req, res) => {
    res.sendFile(__dirname + '/pages/recharge/searchCardScreen/index.html');
});

app.post('/rechargeCard', async(req, res) => {
    idTicket = req.body["pass_number"]
    console.log(req.body);

    rechargeUser = await database.checkUserId(
        idTicket
    );
    
    if (rechargeUser==0){
        /*res.sendFile(__dirname + '/pages/recharge/searchCardScreen/index.html');*/
    } else {
        res.sendFile(__dirname + '/pages/recharge/rechargeCardScreen/rechargeCardScreen.html');
    }
});



app.post('/successRecharge', async(req, res) => { 
    let dateExtension = new DateExtension();
    let rechargeId = new RechargeId().rechargeId();
    date = String(dateExtension.getDatetime());
    type = req.body["type"];

    res.sendFile(__dirname + '/pages/recharge/successRecharge/successRecharge.html');
    console.log(date, rechargeUser[0][0],type); 
  
    await database.rechargeUserTicket(
        rechargeId,
        date,
        rechargeUser[0][0],
        type
    );

    await database.addAmount(
        rechargeUser[0][0],
        type
    );
});

app.get('/rechargeVoucher', async(req, res) => {
    res.sendFile(__dirname + '/pages/recharge/rechargeScreen/rechargeVoucher.html');
});

app.post('/rechargeVoucher', async(req, res) => {
    //data, id, tipo, modalidade
    res.send([date, rechargeUser[0][0], type, rechargeUser[0][3]]);
});



app.get('/validar', (req, res) => {
    res.sendFile(__dirname + '/pages/usage/searchCardUsage/index.html');
});

app.post('/usage', async(req, res) => {
    
    idTicket = req.body["pass_number"];
    console.log(idTicket);

    rechargeUser = await database.checkUserId(
        idTicket
    );
    amountTicket = await database.selectAmount(
        idTicket
    );

    if (rechargeUser==0){
        /*res.sendFile(__dirname + '/pages/recharge/searchCardScreen/index.html');*/
    } else {
        res.sendFile(__dirname + '/pages/usage/usageScreen/index.html');
    };
});

app.get('/usage', (req, res) => {
    if (rechargeUser==0){
        /*res.sendFile(__dirname + '/pages/recharge/searchCardScreen/index.html');*/
    } else {
        res.send([amountTicket[0][0],amountTicket[0][1],amountTicket[0][2],amountTicket[0][3]]);
    };
});

app.post('/validated', async(req, res) => {
    res.sendFile(__dirname + '/pages/usage/validatedTicketScreen/validatedTicketScreen.html');
    type = req.body["selectedType"];
    let rechargeId = new RechargeId().rechargeId();
    let dateExtension = new DateExtension();
    date = String(dateExtension.getDatetime());
    console.log(rechargeId, type, date, rechargeUser[0][0]);

    await database.UsingUserTicket(
        rechargeId,
        type,
        date,
        rechargeUser[0][0]
    );

    await database.subtractAmount(
        rechargeUser[0][0],
        type
    );
});

app.get('/validated', (req, res) => {
    res.send([rechargeUser[0][0],type]); 
});