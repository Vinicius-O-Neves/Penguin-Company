var uniqueBtn = document.getElementById("unico");
var doubleBtn = document.getElementById("duplo");
var weeklyBtn = document.getElementById("semanal");
var monthlyBtn = document.getElementById("mensal");
var btns = [uniqueBtn,doubleBtn,weeklyBtn,monthlyBtn];
var btnsClickedState = [false,false,false,false];
const $select = document.querySelector('#tipo');

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

                if (btnsClickedState[0]==true) {
                    $select.value = 'Único';
                    document.getElementById("buttonConfirm").style.visibility="visible";
                    document.getElementById("textinfo").innerHTML = "Bilhete Único - Para o Bilhete único o sistema irá debitar o crédito do bilhete, e dará ao usuário o direito utilizar o mesmo bilhete em quantos transportes quiser, por um período de 40 minutos."
                } else if (btnsClickedState[1]==true) {
                    $select.value = 'Duplo';
                    document.getElementById("buttonConfirm").style.visibility="visible";
                    document.getElementById("textinfo").innerHTML = "Bilhete Duplo - Este tipo de bilhete pode ser utilizado em dois períodos. Para cada período de utilização do Bilhete Duplo o usuário poderá utilizar o mesmo bilhete em quantos transportes quiser, por um período de 40 minutos."
                } else if (btnsClickedState[2]==true) {
                    $select.value = 'Semanal';
                    document.getElementById("buttonConfirm").style.visibility="visible";
                    document.getElementById("textinfo").innerHTML = "Bilhete Semanal - Este tipo de bilhete dará ao usuário o direito de utilizar o transporte público quantas vezes quiser durante o período de 7 dias, contados apartir da primeira utilização do bilhete."
                } else if (btnsClickedState[3]==true) {
                    $select.value = 'Mensal';
                    document.getElementById("buttonConfirm").style.visibility="visible";
                    document.getElementById("textinfo").innerHTML = "Bilhete Mensal - Este tipo de bilhete dará ao usuário o direito de utilizar o transporte público quantas vezes quiser durante o período de 30 dias, contados apartir da primeira utilização do bilhete."
                } else {
                    document.getElementById("buttonConfirm").style.visibility="hidden";
                    document.getElementById("textinfo").innerHTML = ""
                }
            }
        })
    })
})


function canUse () {
    let canBeUsed = localStorage.getItem("canUse");
    
    if (!canBeUsed){
        document.getElementById("ticket_being_used").style.display="flex";
    } else {
        document.getElementById("ticket_being_used").style.visibility="hidden";
    }
}

