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

module.exports = RechargeId;