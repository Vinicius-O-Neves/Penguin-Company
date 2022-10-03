const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="/src/pages/purchase/passGeneratedScreen/components/frontCard/frontCard.css">
    
    <div class="front_card">
        <img class="img_front_card" src="/src/pages/purchase/passGeneratedScreen/public/cartão_bilhete_urbano_front.svg">
        <div class="codes_info">
            <p class="code_txt_p">Código de acesso:</p>
            <p class="code_txt_p pass_number">#0000</p>
        </div>
    </div>    
`;

class FrontCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["pass_code"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.shadowRoot.querySelector("pass_number").innerText = 
            this.getAttribute("pass_code");    
    }
    
}

window.customElements.define('front-card', FrontCard);

export default FrontCard;