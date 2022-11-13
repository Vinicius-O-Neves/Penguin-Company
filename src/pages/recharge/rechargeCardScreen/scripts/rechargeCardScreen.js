var price=3;
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
  document.getElementById("price").innerHTML = "R$ "+price.toFixed(2);
  document.getElementById("total_price").innerHTML = "Total: R$ "+price.toFixed(2);
  return x;
}