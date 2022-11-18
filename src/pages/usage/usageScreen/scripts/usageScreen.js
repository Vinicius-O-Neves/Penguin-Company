const url = "http://localhost:5500/usage";
function getUserAmount() {
    axios.get(url)
        .then(response => {
            document.getElementById("unico").innerHTML = "Bilhete Único: " + response.data[0] + " restante(s)";
            document.getElementById("duplo").innerHTML = "Bilhete Duplo: " + response.data[1] + " restante(s)";
            document.getElementById("semanal").innerHTML = "Bilhete Semanal: " + response.data[2] + " restante(s)";
            document.getElementById("mensal").innerHTML = "Bilhete Mensal: " + response.data[3] + " restante(s)";
        })
        .catch(error => console.log(error))
}
getUserAmount()

var uniqueBtn = document.getElementById("unico");
var doubleBtn = document.getElementById("duplo");
var weeklyBtn = document.getElementById("semanal");
var monthlyBtn = document.getElementById("mensal");
var btns = [uniqueBtn,doubleBtn,weeklyBtn,monthlyBtn];
var btnsClickedState = [false,false,false,false];

btns.forEach((btnClicked,btnClickPosition) => {
    btnClicked.addEventListener('click', function onClick () {
    
        btns.forEach((btn,index) => {
            if (index!=btnClickPosition) {
                btnsClickedState[index]=false;
                btn.style.background = 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), black)';
            } else {
                btnsClickedState[index] = !btnsClickedState[index];

                if (btnsClickedState[index]) {
                    btn.style.background = 'linear-gradient(to bottom right, rgb(8, 0, 255),rgb(2, 0, 56))';
                } else {
                    btn.style.background = 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), black)';
                }
                
            }
        })
    })
})

function teste() {
    var x = btnsClickedState.indexOf(true);
    console.log(x);
}