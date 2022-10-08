const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="/src/common/components/footer/styles/footer.css">
    <link rel="stylesheet" href="/src/common/styles/fonts.css">
    
    <footer class="footer">
    <div class="footer_container">
        <a><h1 class="footer_logo">LOGO</h1></a>
        <div class="row_1">
            <p class="about_p row1_element">
                No Nome do Site sua compra esta segura!
                Para garantirmos que seus dados estejam sempre protegidos,
                não armazenamos nenhuma informação do cartão de crédito utilizando,
                seguindo os protocolos de criptografia e segurança das principais 
                instituições bancárias do Brasil.
            </p>
            <ul class="other_pages row1_element">
                <li class="page_footer_link"><a href="#"><u>Comprar Ticket</u></a></li>
                <li class="page_footer_link"><a href="#"><u>Gerenciar Ticket</u></a></li>
                <li class="page_footer_link"><a href="#"><u>Regarregar Ticket</u></a></li>
                <li class="page_footer_link"><a href="#"><u>Sobre nós</u></a></li>
            </ul>
            <img class="row1_element warranty_img row_1" src="/src/common/components/footer/public/warranty.svg">
        </div>
        <div class="row_2">
            <ul class="destinys">
                <h1 class="destinty_list">Destinos</h1>
                <li><a href="#"><u>Amusement Mile</u></a></li>
                <li><a href="#"><u>Burnley</u></a></li>
                <li><a href="#"><u>Somerset</u></a></li>
                <li><a href="#"><u>Old Gotham</u></a></li>
                <li><a href="#"><u>Mais destinos +</u></a></li>
            </ul>
        </div>
        <div class="col_1">
            <h5 class="copyright">Copyright 2022 © Todos os Direitos Reservados. Desenvolvido por: </h5>
            <p class="copyright_name">Felipe Fadelli Padovan</p>
            <p class="copyright_name">Felipe Santos de Lima</p>
            <p class="copyright_name">Matheus Santos Caldas</p>
            <p class="copyright_name">Raphaela de Souza Ribeiro</p>
            <p class="copyright_name">Vinicius Henrique de Oliveira Neves</p>
        </div>
    </div>
</footer>
`;

class CustomFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('custom-footer', CustomFooter);

export default CustomFooter;