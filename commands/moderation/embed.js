const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");
const roles = require("../../roles.json");

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
            .setTitle(`${emote.emojis.IUT} Bienvenue sur le discord de l'IUT Informatique D'Aubière ! ${emote.emojis.IUT}`)
            .setDescription("Choix des différents rôles de classes :")
            .addFields(
                {name: `${emote.numbers.id_emote.one} - Groupe 1A`, value:`<@&${roles.deuxa2.groupe_1A}>`},
                {name:`${emote.numbers.id_emote.two} - Groupe 2A`,value:`<@&${roles.deuxa2.groupe_2A}>`},
                {name:`${emote.numbers.id_emote.three} - Groupe 3A`,value:`<@&${roles.deuxa2.groupe_3A}>`},
                {name:`${emote.numbers.id_emote.four} - Groupe 1B`,value:`<@&${roles.deuxa2.groupe_1B}>`},
                {name:`${emote.numbers.id_emote.five} - Groupe 2B`,value:`<@&${roles.deuxa2.groupe_2B}>`},
                {name:`${emote.numbers.id_emote.six} - Groupe 3B`,value:`<@&${roles.deuxa2.groupe_3B}>`},
                {name:`${emote.numbers.id_emote.seven} - Groupe 4B`,value:`<@&${roles.deuxa2.groupe_4B}>`}
            )
            .setFooter('BDE ASCII','https://cdn.discordapp.com/attachments/832305040344481822/906146823062847508/logo.png')

        message.channel.send({embeds : [noelEmbed]}).then( m => {
            m.react(emote.numbers.id.one);
            m.react(emote.numbers.id.two);
            m.react(emote.numbers.id.three);
            m.react(emote.numbers.id.four);
            m.react(emote.numbers.id.five);
            m.react(emote.numbers.id.six)
            m.react(emote.numbers.id.seven);
        })
    }
}
