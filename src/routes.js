const DateExtension = require('./common/scripts/DateExtension.js');
const GenerationExtension = require('./common/scripts/GenerationExtension.js');
const RechargeId = require('./pages/recharge/searchCardScreen/scripts/searchCardScreen.js');

const nodeConfiguration = require('./nodeConfiguration.js');
const app = new nodeConfiguration().init();

const DB = require('./database/server.js');
const { BIND_IN, BIND_OUT } = require('oracledb');
const database = new DB();

var rechargeUser;
let userId, date, idTicket, type, amountSpend;
var modality;

app.get('/buy', (req, res) => {
    res.sendFile(__dirname + '/pages/purchase/buyScreen/index.html');
});

app.post('/rules', async (req, res) => {
    let dateExtension = new DateExtension();
    userId = new GenerationExtension().makeId(6);
    modality = req.body["modality"];
    date = dateExtension.getDate();
    type = req.body["type"];
    amountSpend = new TotalPrice()
    console.log(userId,date,2,modality);

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
    console.log([date, rechargeUser[0][0], type]);
    res.send([date, rechargeUser[0][0], type, rechargeUser[0][3]]);
});