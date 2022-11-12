const url = "http://localhost:5500/rechargeVoucher";
function getUserRecharge() {
    axios.post(url)
        .then(response => {
            var data = document.getElementById("data");
            var passCode = document.getElementById("pass_code");
            var tipo = document.getElementById("tipo");

            data.setAttribute('modality', response.data[0]);
            passCode.setAttribute('type', response.data[1]);
            tipo.setAttribute('date', response.data[2]);
        })
        .catch(error => console.log(error))
}
getUserRecharge()

