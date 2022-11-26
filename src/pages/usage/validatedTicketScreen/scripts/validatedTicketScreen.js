const url = "http://localhost:5500/validated";
function getUserValidation() {
    axios.get(url)
        .then(response => {
            document.getElementById("user").innerHTML = "Código: " + response.data[0];
            document.getElementById("tipo").innerHTML = "Tipo: " + response.data[1];

            if (response.data[1] == "Único" || response.data[1] == "Duplo") {
                document.getElementById("time").innerHTML = "Válido por 40 minutos"
            } else if (response.data[1] == "Semanal") {
                document.getElementById("time").innerHTML = "Válido por 7 dias"
            } else if (response.data[1] == "Mensal") {
                document.getElementById("time").innerHTML = "Válido por 30 dias"
            }
        })
        .catch(error => console.log(error))
}
getUserValidation()
