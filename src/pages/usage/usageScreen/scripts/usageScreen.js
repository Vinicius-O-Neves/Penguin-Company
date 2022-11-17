const url = "http://localhost:5500/usage";
function getUserAmount() {
    axios.get(url)
        .then(response => {
            document.getElementById("unico").innerHTML = response.data[0];
            document.getElementById("duplo").innerHTML = response.data[1];
            document.getElementById("semanal").innerHTML = response.data[2];
            document.getElementById("mensal").innerHTML = response.data[3];
        })
        .catch(error => console.log(error))
}
getUserAmount()