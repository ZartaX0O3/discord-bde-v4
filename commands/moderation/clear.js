const {MessageEmbed} = require("discord.js");
const channels = require("../../channels.json");
const emote = require("../../emojis.json");

module.exports = {
    name: "clear",
    alias: ["cl"],
    cooldown: 5,
    description: "Commande de clear de message (Réservé admin)",
    usage: "*clear [nombre de message]",
    category: "Moderation",
    run: function (client, message, args) {

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas les permissions");

    if (!args[0]) return message.channel.send("Vous devez mettre un nombre de messages à supprimer");

    if (isNaN(args[0])) return message.channel.send("Le nombre de message est invalide");

    if (parseInt(args[0]) <= 0 || parseInt(args[0]) >= 99) return message.channel.send("Le nombre de messages à supprimer doit être compris entre 1 et 99.");

    message.channel.bulkDelete(parseInt(args[0]) + 1);

    const embed = new MessageEmbed()
        .setColor("#f4cc5c")
        .setTitle(`${emote.emojis.yellow_circle} **Suppresion de messages**`)
        .addFields(
            {name: "Nombres de messages : ", value: `${args[0]}`},
            {name: " ID Salon : ", value: message.channel.id},
            {name: " Salon : ", value: message.channel.name},
            {name: "Par :", value: message.author}
        )

    message.guild.channels.cache.get(channels.sanctionLogsChannel).send(embed)
    message.channel.send(`Vous avez supprimé ${args[0]} message(s)`).then(msg => {
        setTimeout(() => {
            msg.delete()
        }, 5000);
    });
}
}