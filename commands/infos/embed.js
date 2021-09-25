const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");
const roles = require("../../roles.json");

module.exports = {
    name: "embed",
    description: "Commande de lancement d'embed (Réservé admin)",
    usage: "*embed",
    category: "Moderation",
    cooldown: 5,
    run: async function (client, message, args) {

        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("**Permission Admin nécessaire**")

        const embed = new MessageEmbed()
            .setAuthor(message.member.user.username)
            .setColor("#03c3ff")
            .setTitle(` ${emote.emojis.IUT} **Bienvenue sur le discord de l'IUT Informatique D'Aubière !** ${emote.emojis.IUT} \n`)
            .setDescription(`Choix des différents rôles de classes :\n\n**Rôles**\n\n${emote.numbers.id.one} - <@&${roles.groupe.groupe_1}>\n✧\n${emote.numbers.id.two} - <@&${roles.groupe.groupe_2}>\n✧\n${emote.numbers.id.three} - <@&${roles.groupe.groupe_3}>\n✧\n${emote.numbers.id.four} - <@&${roles.groupe.groupe_4}>\n✧\n${emote.numbers.id.five} - <@&${roles.groupe.groupe_5}>\n✧\n${emote.numbers.id.six} - <@&${roles.groupe.groupe_6}>\n✧\n${emote.numbers.id.seven} - <@&${roles.groupe.groupe_7}>\n✧\n${emote.numbers.id.eight} - <@&${roles.groupe.groupe_8}>\n✧\n${emote.numbers.id.nine} - <@&${roles.groupe.groupe_9}>\n✧\n${emote.numbers.id.zero} - <@&${roles.groupe.groupe_10}>\n✧\n${emote.emojis.phone} - <@&${roles.licence.licencePm}>\n✧\n${emote.emojis.www} - <@&${roles.licence.licenceWeb}>\n✧\n${emote.emojis.rt} - <@&${roles.licence.licenceRt}>\n`)
            .setTimestamp()

        message.channel.send(embed).then(msg => {
        msg.react(emote.numbers.id.one);
        msg.react(emote.numbers.id.two);
        msg.react(emote.numbers.id.three);
        msg.react(emote.numbers.id.four);
        msg.react(emote.numbers.id.five);
        msg.react(emote.numbers.id.six);
        msg.react(emote.numbers.id.seven);
        msg.react(emote.numbers.id.eight);
        msg.react(emote.numbers.id.nine);
        msg.react(emote.numbers.id.zero);
        msg.react(emote.emojis.phone);
        msg.react(emote.emojis.www);
        msg.react(emote.emojis.rt);
        });

    }
}
