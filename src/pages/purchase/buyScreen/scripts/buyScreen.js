function getDate() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
// This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}/${month}/${year}`;
  var input = document.getElementById ("date");
  input.innerText = currentDate;
  return currentDate;
}

getDate()

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function alertValues() {
    var values = [makeid(8),getDate(),0,getModality()];
    alert(values);
    return values;
  }


function getType() {
    let selectType = document.querySelector('#tipo');
    let optionType = selectType.options[selectType.selectedIndex];

    var typeText = optionType.text;
    return typeText;
  }

function getModality() {
    let selectModality = document.querySelector('#modalidade');
    let optionModality = selectModality.options[selectModality.selectedIndex];

    var modalityText = optionModality.text;
    return modalityText;
  }

function select(selfTag) {
    var x = selfTag.options[selfTag.selectedIndex].value;

    if (x=="Único") {
      document.getElementById("textinfo").innerText = "Bilhete Único - Para o Bilhete único o sistema irá debitar o crédito do bilhete, e dará ao usuário o direito utilizar o mesmo bilhete em quantos transportes quiser, por um período de 40 minutos."
    } else if (x=='Duplo') {
      document.getElementById("textinfo").innerText = "Bilhete Duplo - Este tipo de bilhete pode ser utilizado em dois períodos. Para cada período de utilização do Bilhete Duplo o usuário poderá utilizar o mesmo bilhete em quantos transportes quiser, por um período de 40 minutos."
    } else if (x=='Semanal') {
      document.getElementById("textinfo").innerText = "Bilhete Semanal - Este tipo de bilhete dará ao usuário o direito de utilizar o transporte público quantas vezes quiser durante o período de 7 dias, contados apartir da primeira utilização do bilhete."
    } else if (x=='Mensal') {
      document.getElementById("textinfo").innerText = "Bilhete Mensal - Este tipo de bilhete dará ao usuário o direito de utilizar o transporte público quantas vezes quiser durante o período de 30 dias, contados apartir da primeira utilização do bilhete."
    }
  }
