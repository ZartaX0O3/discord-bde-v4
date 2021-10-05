const {MessageActionRow, MessageEmbed, MessageSelectMenu} = require('discord.js');
const emote = require("../../emojis.json");
const roles = require("../../roles.json");

module.exports = {
    name: "embed",
    description: "Commande de lancement d'embed (Réservé admin)",
    usage: "*embed",
    category: "Moderation",
    cooldown: 5,
    run: async function (client, message, args) {

        console.log("test");

        const embed = new MessageEmbed()
            .setTimestamp()
            .setColor("#ff6700")
            .setAuthor(message.member.user.username, message.member.user.displayAvatarURL())
            .setFooter("© BDE ASCII", 'https://cdn.discordapp.com/attachments/762781960224768062/872842431924699176/logo_300.png')
            .setTitle("Message automatique :")
            .addField("**Rôle de délégués**", "Bonjour à tous ! J'aimerais que vous me fassiez passer vos deux délégués (Titulaire et supplément) via message privé ici : .ZartaX0O3#8888")

        message.channel.send(embed);
    }
}

