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
                } else if (btnsClickedState[1]==true) {
                    $select.value = 'Duplo';
                } else if (btnsClickedState[2]==true) {
                    $select.value = 'Semanal';
                } else if (btnsClickedState[3]==true) {
                    $select.value = 'Mensal';
                }
                
            }
        })
    })
})

function teste() {
    var x = btnsClickedState.indexOf(true);
    return x;
}