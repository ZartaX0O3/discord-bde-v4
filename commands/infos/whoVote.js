const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");
const pollModel = require("../../models/pollSchema");

module.exports = {
    name: "whoVote",
    cooldown: 5,
    alias: ["whV"],
    description: "Commande de récupération des votes d'un sondage (Réservé Admin)",
    usage: "*whoVote [id sondage]",
    category: "Fun",
    run: async function (client, message, args) {

        if (!message.member.permissions.has("ADMINISTRATOR")) return;
        
        poll_id = args[0];
        pollProfile = await pollModel.findOne({id: poll_id});

        var liste = pollProfile.listeVoteurs;
        var choix = pollProfile.choixVoteurs;
        
        var messageRes = "";

        liste.forEach((element, index) => {

            if(choix[index] == pollProfile.response_1){

                messageRes+= "<@" + element + ">";

            }
            
        });

        message.channel.send(messageRes);
    }
}