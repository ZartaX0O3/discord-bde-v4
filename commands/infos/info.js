const {MessageEmbed} = require("discord.js");
const emojis = require("../../emojis.json");

module.exports = {
    name: "info",
    alias: ["i"],
    cooldown: 5,
    description: "Commande d'informations du BOT",
    usage: "*info",
    category: "Commandes utiles",
    run: function (client, message, args) {

        const embed = new MessageEmbed()
            .setColor("#ffd800")
            .setTitle("__Informations du BOT__")
            .addFields(
                {name: ` ${emojis.emojis.green_globe} Createur :`, value: `ZartaX0O3`},
                {name: ` ${emojis.emojis.hautPaleur_A} Version :`, value: '1.2.0'},
                {name: ` ${emojis.emojis.outils} Serveur :`, value: message.guild.name},
                {
                    name: ` ${emojis.emojis.admin_emote} Nombre de personnes sur le serveur :`,
                    value: message.guild.memberCount
                },
                {
                    name: ` ${emojis.emojis.admin_emote} Nombre de BOT sur le serveur :`,
                    value: message.guild.members.cache.filter(member => member.user.bot).size
                },
                {name: ` ${emojis.emojis.embed_emote} Librairie :`, value: 'Discord.js'},
            )
            .setAuthor(message.member.user.username, message.member.user.displayAvatarURL({dynamic: true}))
            .setFooter(`© Set'UP at ${message.createdAt}`)

        message.channel.send(embed);
    }
}