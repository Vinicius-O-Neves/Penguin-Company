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

var price=3, discount=0, totalPrice=3;

function select(selfTag) {
    var x = selfTag.options[selfTag.selectedIndex].value;
    
    if (x=="Único") {
      document.getElementById("textinfo").innerHTML = "Bilhete Único - Para o Bilhete único o sistema irá debitar o crédito do bilhete, e dará ao usuário o direito utilizar o mesmo bilhete em quantos transportes quiser, por um período de 40 minutos."
      price = 3;
    } else if (x=='Duplo') {
      document.getElementById("textinfo").innerHTML = "Bilhete Duplo - Este tipo de bilhete pode ser utilizado em dois períodos. Para cada período de utilização do Bilhete Duplo o usuário poderá utilizar o mesmo bilhete em quantos transportes quiser, por um período de 40 minutos."
      price = 5;
    } else if (x=='Semanal') {
      document.getElementById("textinfo").innerHTML = "Bilhete Semanal - Este tipo de bilhete dará ao usuário o direito de utilizar o transporte público quantas vezes quiser durante o período de 7 dias, contados apartir da primeira utilização do bilhete."
      price = 20;
    } else if (x=='Mensal') {
      document.getElementById("textinfo").innerHTML = "Bilhete Mensal - Este tipo de bilhete dará ao usuário o direito de utilizar o transporte público quantas vezes quiser durante o período de 30 dias, contados apartir da primeira utilização do bilhete."
      price = 50;
    }
    document.getElementById("price").innerHTML = "R$ "+(price.toFixed(2)).replace(".", ",");
    document.getElementById("new_price").innerHTML = "R$ "+ ((price*((100-discount)/100)).toFixed(2)).replace(".", ",");
    document.getElementById("total_price").innerHTML = "Total: R$ " + ((price*((100-discount)/100)).toFixed(2)).replace(".", ",");
    return x;
  }

  function selectModality(selfTag) {
    var x = selfTag.options[selfTag.selectedIndex].value;

    if (x=="Tradicional") {
      discount = 0;
      document.getElementById("discount").innerHTML = "";
      document.getElementById("price").innerHTML = ""
    } else if (x=='PCD') {
      discount = 25;
      document.getElementById("discount").innerHTML = "Desconto: " + discount+"%";
      document.getElementById("price").innerHTML = "R$ "+(price.toFixed(2)).replace(".", ",");
    } else if (x=='Idoso') {
      discount = 25;
      document.getElementById("discount").innerHTML = "Desconto: " + discount+"%";
      document.getElementById("price").innerHTML = "R$ "+(price.toFixed(2)).replace(".", ",");
    } else if (x=='Gestante') {
      discount = 50;
      document.getElementById("discount").innerHTML = "Desconto: " + discount+"%";
      document.getElementById("price").innerHTML = "R$ "+(price.toFixed(2)).replace(".", ",");
    } else if (x=='Estudante') {
      discount = 50;
      document.getElementById("discount").innerHTML = "Desconto: " + discount+"%";
      document.getElementById("price").innerHTML = "R$ "+(price.toFixed(2)).replace(".", ",");
    }
    document.getElementById("total_price").innerHTML = "Total: R$ " + (price*((100-discount)/100)).toFixed(2).replace(".", ",");
    document.getElementById("new_price").innerHTML = "R$ "+ (price*((100-discount)/100)).toFixed(2).replace(".", ",");
    return x;
  }