const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="/src/pages/purchase/passGeneratedScreen/components/backCard/backCard.css">
    
    <div class="back_card">
        <img class="img_back_card" src="/src/pages/purchase/passGeneratedScreen/public/cartão_bilhete_urbano_back.svg">
        <div class="codes_info">
            <p class="code_txt_p">Código de acesso:</p>
            <p class="code_txt_p pass_number">#0000</p>
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
        return [""];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.shadowRoot.querySelector("").innerText = 
            this.getAttribute("");    
    }
    
}

window.customElements.define('front-card',);

export default BackCard;