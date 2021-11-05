const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");

module.exports = {
    name: "embed",
    category: "Moderations",
    aliases: ["emb"],
    cooldown: 10,
    usage: "embed",
    description: "Lancement de l'embed pré-chargé",
    memberpermissions: ["ADMINISTRATOR"],
    requiredroles: [],
    alloweduserids: [],
    minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message) => {

        const noelEmbed = new MessageEmbed()
            .setColor("#070707")
            .setTitle(` 🔶 Bonjour à tous !! 🔶`)
            .setDescription("J'espère que vous allez bien, aujourd'hui j'annonce le départ du Concours de Logo pour les pulls de l'année 2021-2022\n **Pour rappel, pour que votre logo puisse paraître dans le concours il doit obligatoirement répondre aux critères suivant :**")
            .addFields(
                { name: '\u200B', value: '\u200B' },
                {name: `${emote.emojis.arrow_right} Deux logos demandés`, value:`Un petit pour l'avant et un plus grand pour l'arrière (*dans le même thème mais différent l'un de l'autre*)`},
                {name:`${emote.emojis.arrow_right} Doit contenir les mots suivant`,value:`"ASCII", "Clermont", "2021-2022"`},
                {name:`${emote.emojis.arrow_right} Date fin`,value:`Doit être fini **AVANT** le  **01/12/2021**`},
                {name:`${emote.emojis.arrow_right} Unicolore`,value:`Les logos doivent être en blanc uniquement`},
                { name: '\u200B', value: '\u200B' }
            )
            .addField('**Infos**','La soirée se déroulera à l\'Usine (NightClub), les inscriptions sont désormais ouvertes jusqu\'au 20 Novembre (après cela impossible de s\'inscrire donc dépêchez vous ! ).\n**Voici la décharge de responsabilité obligatoire pour tous le monde, nous la donnons en avance pour que tous le monde puisse déjà la faire signer (Signature électronique valide), début des réservations lundi de la rentrée**')
            .setImage('https://cdn.discordapp.com/attachments/832304727206789170/906140700259794974/IMG_4900.jpg')
            .setFooter('BDE ASCII','https://cdn.discordapp.com/attachments/832305040344481822/906146823062847508/logo.png')

        message.channel.send({embeds : [noelEmbed]});
    }
}
