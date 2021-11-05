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
            .setAuthor(message.member.user.username, message.member.user.displayAvatarURL())
            .setTitle(` 🔶 Bonjour à tous 🔶`)
            .setDescription("\nPour rappel :")
            .addFields(
                {name: `${emote.emojis.arrow_right} Jeudi 16 Décembre`, value:``},
                {name:`${emote.emojis.arrow_right} 600 personnes (Inter IUT)`,value:``},
                {name:`${emote.emojis.arrow_right} Prix 27€ pour adhérent, 30€ sinon`,value:``},
                {name:`${emote.emojis.arrow_right} Alcool compris ainsi que le service (8 serveurs), un DJ et la salle`,value:``},
                {name:`${emote.emojis.arrow_right} Ouvert aux externes`,value:``}
            )
            .addField('**Infos**','La soirée se déroulera à l\'Usine (NightClub), les inscriptions sont désormais ouvertes jusqu\'au 20 Novembre (après cela impossible de s\'inscrire donc dépêchez vous ! ).\n**Voici la décharge de responsabilité obligatoire pour tous le monde, nous la donnons en avance pour que tous le monde puisse déjà la faire signer (Signature électronique valide), début des réservations lundi de la rentrée**')
            .setImage('https://cdn.discordapp.com/attachments/832304727206789170/906140700259794974/IMG_4900.jpg')
            .setFooter('BDE ASCII','https://cdn.discordapp.com/attachments/832305040344481822/906146823062847508/logo.png')

        message.channel.send({embeds : [noelEmbed]});
    }
}
