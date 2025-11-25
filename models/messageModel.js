const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/messages.json');

// Lire tous les messages depuis le fichier JSON
const getAllMessages = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error){
        //Si le fichier n'existe pas ou est vide, retourner un tableau vide
        return [];
    }
};

//Sauvegarde un nouveau message dans le fichier JSON
const saveMessage = (message) => {
    const messages = getAllMessages();

    //Ajoute le nouveau message au début
    messages.unshift({
        id: Date.now(),
        titre: message.titre,
        corps: message.corps,
        nom: message.nom,
        date: new Date().toLocaleString('fr-FR')
    });

    //Écrire dans le fichier JSON
    fs.writeFileSync(dataPath, JSON.stringify(messages, null, 2));
    return messages;
};

module.exports = {getAllMessages, saveMessage};