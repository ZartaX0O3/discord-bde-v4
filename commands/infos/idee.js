const {MessageEmbed} = require("discord.js");
const channels = require("../../channels.json");

module.exports = {
    name: "idee",
    alias: ["id"],
    description: "Commande d'envoie d'idées",
    usage: "*idee [ton idee]",
    cooldown: 5,
    category: "Commandes utiles",
    run: function (client, message, args) {

    let proposition = args.join(" ");

    const embed = new MessageEmbed()
        .setAuthor(message.member.user.username)
        .setTitle('Proposition reçu :')
        .setDescription(proposition)
        .setTimestamp()
        .setColor('#ff6700')

    message.guild.channels.cache.get(channels.sanctionLogsChannel).send(embed);

    message.reply("Votre proposition a bien été envoyé !");
    message.delete();
    }
}