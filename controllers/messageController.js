const {validationResult} = require('express-validator');
const {getAllMessages, saveMessage} = require('../models/messageModel');

//Affiche la page avec la liste des messages
exports.getMessages = (req, res) => {
    const messages = getAllMessages();
    res.render('index', {messages, errors: []});
};

//Traite le formulaire et enregistre le message
exports.postMessage = (req, res) => {
    //Vérifie les erreurs de validation
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        //Si erreurs, réaffiche la page avec les erreus
        const messages = getAllMessages();
        return res.render('index', {
            messages,
            errors: errors.array()
        });
    }

    //Si tout est valide, sauvegarde le message
    const newMessage = {
        titre: req.body.titre,
        corps: req.body.corps,
        nom: req.body.nom
    };
    saveMessage(newMessage);

    //Redirige vers la page d'accueil
    res.redirect('/');
}