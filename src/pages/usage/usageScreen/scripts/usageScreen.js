const url = "http://localhost:5500/usage";
function getUserAmount() {
    axios.get(url)
        .then(response => { 
            if (response.data[0]<=0) {
                document.getElementById("unico").style.display = 'none'
            } 
            if (response.data[1]<=0) {
                document.getElementById("duplo").style.display = 'none'
            } 
            if (response.data[2]<=0) {
                document.getElementById("semanal").style.display = 'none'
            } 
            if (response.data[3]<=0) {
                document.getElementById("mensal").style.display = 'none'
            } 
            if (response.data[0]<=0 && response.data[1]<=0 && response.data[2]<=0 && response.data[3]<=0) {
                document.getElementById("error").style.display = 'flex'
                document.getElementById("buttonConfirm").style.display = 'none'
            }
            
            document.getElementById("unico").innerHTML = "Bilhete Único: " + response.data[0] + " restante(s)";
            document.getElementById("duplo").innerHTML = "Bilhete Duplo: " + response.data[1] + " restante(s)";
            document.getElementById("semanal").innerHTML = "Bilhete Semanal: " + response.data[2] + " restante(s)";
            document.getElementById("mensal").innerHTML = "Bilhete Mensal: " + response.data[3] + " restante(s)";
        })
        .catch(error => console.log(error))
}
getUserAmount()

