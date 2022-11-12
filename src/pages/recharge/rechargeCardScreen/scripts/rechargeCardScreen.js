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