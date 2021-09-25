const {MessageEmbed} = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "player",
    alias: ["user","userinfo","u"],
    cooldown: 5,
    description: "Commande d'informations joueur (Réservé admin)",
    usage: "*player [id]",
    category: "Moderation",
    run: function (client, message, args) {

    if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("**Permission Admin nécessaire**")

    const member = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
    const created = moment(member.user.createdAt).format('DD/MM/YY');
    const joined = moment(member.joinedAt).format('DD/MM/YY');

    const embed = new MessageEmbed()
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
        .setTitle("**━━━❮Information sur l'utilisateur❯━━━**")
        .setDescription("\u200B")
        .addFields(
            {name: `**Username :**`, value: `${member.user.username} `, inline: true},
            {name: `**Date de join :**`, value: `${joined}`, inline: true},
            {name: `**Compte crée le**`, value: `${created} `, inline: true},
        )

        .addFields(
            {name: `**Tag :**`, value: `${member.user.tag} `, inline: true},
            {name: `**Identifiant utilisateur**`, value: `${member.user.id}`, inline: true},
        )

        .addField("Roles", member.roles.cache.map(r => '`' + r.name + '`').join(' - '))

    message.channel.send(embed);
    }
}