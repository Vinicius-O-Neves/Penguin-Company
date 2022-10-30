class NodeConfiguration {
    init() {
        const express = require('express');
        const bodyParser = require('body-parser');
        const app = express();

        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: false}))

        /* Imports comuns */
        app.use(express.static(__dirname + '/common/styles'));
        app.use(express.static(__dirname + '/common/public/images'));

        app.use(express.static(__dirname + '/common/components/header/scripts'));
        app.use(express.static(__dirname + '/common/components/header/styles'));

        app.use(express.static(__dirname + '/common/components/footer/scripts'));
        app.use(express.static(__dirname + '/common/components/footer/styles'));
        app.use(express.static(__dirname + '/common/components/footer/public'));
        /* -------------------------------------------------------------------- */

        /* Paginas */
        app.use(express.static(__dirname + '/pages/purchase/buyScreen/styles'));
        app.use(express.static(__dirname + '/pages/purchase/buyScreen/scripts'));

        app.use(express.static(__dirname + '/pages/purchase/rulesScreen/styles'));
        app.use(express.static(__dirname + '/pages/purchase/rulesScreen/scripts'));

        app.use(express.static(__dirname + '/pages/purchase/passGeneratedScreen/styles'));
        app.use(express.static(__dirname + '/pages/purchase/passGeneratedScreen/scripts'));
        app.use(express.static(__dirname + '/pages/purchase/passGeneratedScreen/public/images/'));
        app.use(express.static(__dirname + '/pages/purchase/passGeneratedScreen/components/backCard'));
        app.use(express.static(__dirname + '/pages/purchase/passGeneratedScreen/components/frontCard'));
        /* -------------------------------------------------------------------------------------------- */

        app.listen(5500, () => {
            console.log("servidor rodando\n");
        });

        return app;
    }
}

module.exports = NodeConfiguration;