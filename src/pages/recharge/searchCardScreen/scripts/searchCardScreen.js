

var db = db

var ticketId = "";

class RechargeId {
    rechargeId() {
        var x = Math.floor(Math.random() * 999999) + 1;
        return x;
    }

    getId() {
        var text = document.getElementById["pass_number"].value;
        return text;
    }
}

function idValid () {
    let isValid = localStorage.getItem("idValid");
    
    if (!isValid){
        document.getElementById("error").style.display="flex";
    } else {
        document.getElementById("error").style.visibility="hidden";
    }
}

function getPassNumberText(input) {
    ticketId = input.value;
    console.log(input.value);
    getTicketUserInfo(ticketId);
}

function getTicketUserInfo(id) {
    db.checkUserId(id);
    console.log(id);
}



module.exports = RechargeId;