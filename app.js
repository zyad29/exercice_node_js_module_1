const express = require('express');
const {body} = require('express-validator');
const messageController = require('./controllers/messageController');

const app = express();
const PORT = 3000;

//Configuration d'Express
app.set('view engine', 'ejs'); //ejs pour les templates
app.use(express.urlencoded({extended: true})); //Pour parser les données du formulaire
app.use(express.static('public'));

//ROUTES

//Page d'accueil avec la liste des messages
app.get('/', messageController.getMessages);

//Traitement du formulairee avec validation
app.post('/message', [
    //Validation du titre
    body('titre')
        .trim()
        .notEmpty().withMessage('Le titre est obligatoire')
        .isLength({min: 3, max: 100}).withMessage('Le titre doit contenir entre 3 et 100 caractères')
        .escape(),
    
    //Validation du corps du message
    body('corps')
        .trim()
        .notEmpty().withMessage('Le corps du message est obligatoire')
        .isLength({min: 10, max: 1000}).withMessage('Le corps du message doit contenir entre 10 et 1000 caractères')
        .escape(),

    body('nom')
        .trim()
        .notEmpty().withMessage('Le nom est obligatoire')
        .isLength({min: 2, max: 50}).withMessage('Le nom doit contenir entre 2 et 50 caractères')
        .escape(),
], messageController.postMessage);

//Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});