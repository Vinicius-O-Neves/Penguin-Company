const url = "http://localhost:5500/ticketGenerenated";
function getUserTicket() {
    axios.get(url)
        .then(response => {
            var backCard = document.getElementById("back_card");
            var frontCard = document.getElementById("front_card");

            backCard.setAttribute('modality', response.data[0]);
            backCard.setAttribute('type', response.data[1]);
            backCard.setAttribute('date', response.data[2]);
            frontCard.setAttribute('pass_code', response.data[3]);
        })
        .catch(error => console.log(error))
}
getUserTicket()