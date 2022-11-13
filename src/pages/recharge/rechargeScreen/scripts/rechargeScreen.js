const url = "http://localhost:5500/rechargeVoucher";
function getUserRecharge() {
    axios.post(url)
        .then(response => {
            document.getElementById("data").innerHTML = response.data[0];
            document.getElementById("pass_code").innerHTML = response.data[1];
            document.getElementById("tipo").innerHTML = response.data[2];
            document.getElementById("modalidade").innerHTML = response.data[3];
        })
        .catch(error => console.log(error))
}
getUserRecharge()

