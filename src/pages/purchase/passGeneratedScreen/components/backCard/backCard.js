const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="/backCard.css">
    <link rel="stylesheet" href="/fonts.css">
    
    <div class="back_card">
        <img class="img_back_card" src="/cartão_bilhete_urbano_back.svg">
        <div class="card_infos">
            <div>
                <p class="code_txt_p">Modalidade:</p>
                <p class="code_txt_p modality">Tradicional</p>
            </div>
            <div>
                <p class="code_txt_p">Tipo de passe:</p>
                <p class="code_txt_p type">Único</p>
            </div>
            <div>
                <p class="code_txt_p">Data de geração:</p>
                <p class="code_txt_p date">31/08/2022</p>
            </div>
        </div>
    </div>    
`;


class BackCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["modality", "type", "date"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.shadowRoot.querySelector(".modality").innerText = 
            this.getAttribute("modality");
        this.shadowRoot.querySelector(".type").innerText = 
            this.getAttribute("type");  
         this.shadowRoot.querySelector(".date").innerText = 
            this.getAttribute("date");
    }
    
}



window.customElements.define('back-card', BackCard);

export default BackCard;