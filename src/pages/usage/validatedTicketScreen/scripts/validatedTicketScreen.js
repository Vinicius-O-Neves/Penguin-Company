const url = "http://localhost:5500/validated";
function getUserValidation() {
    axios.get(url)
        .then(response => {
            document.getElementById("user").innerHTML = response.data[0];
            document.getElementById("tipo").innerHTML = response.data[1];
        })
        .catch(error => console.log(error))
}
getUserValidation()
