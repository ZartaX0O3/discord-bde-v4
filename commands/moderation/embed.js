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
            .setTitle(`Bienvenue sur le discord de Game Center !`)
            .setDescription("Choix des différents rôles de jeux :")
            .addFields(
                {name: `${emote.game.id.starCitizen} - Star Citizen`, value:`<@&${roles.game.starCitizenPV}>`},
                {name:`${emote.game.id.satisfactory} - Satisfactory`,value:`<@&${roles.game.satisfactoryPV}>`},
                {name:`${emote.game.id.apex} - Apex Legends`,value:`<@&${roles.game.apexPV}>`},
                {name:`${emote.game.id.minecraft} - Minecraft`,value:`<@&${roles.game.starCitizenPV}>`},
                {name:`${emote.game.id.the_forest} - The Forest`,value:`<@&${roles.game.theForestPV}>`},
                {name:`${emote.game.id.trackmania} - Trackmania`,value:`<@&${roles.game.tmPV}>`},
                {name:`${emote.game.id.valorant} - Valorant`,value:`<@&${roles.game.valorantPV}>`},
                {name:`${emote.game.id.wot} - World of Tanks`,value:`<@&${roles.game.wotPV}>`},
                {name:`${emote.game.id.lol} - League of Legends`,value:`<@&${roles.game.lolPV}>`}
            )
            .setFooter('Game Center')

        message.channel.send({embeds : [noelEmbed]}).then( m => {
            m.react(emote.game.id.starCitizen);
            m.react(emote.game.id.satisfactory);
            m.react(emote.game.id.apex);
            m.react(emote.game.id.minecraft);
            m.react(emote.game.id.the_forest);
            m.react(emote.game.id.trackmania);
            m.react(emote.game.id.valorant);
            m.react(emote.game.id.csgo);
            m.react(emote.game.id.lol);
        })
    }
}
