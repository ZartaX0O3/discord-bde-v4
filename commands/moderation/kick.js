const {MessageEmbed} = require("discord.js");
const channels = require("../../channels.json");
const emote = require("../../emojis.json");

module.exports = {
    name: "kick",
    alias: ["k"],
    cooldown: 5,
    description: "Commande de kick (Réservé admin)",
    usage: "*kick [id] [raison]",
    category: "Moderation",
    run: function (client, message, args) {

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("**Permission Admin nécessaire**");
    
    const member = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
    args.shift();
    const raison = args.join(" ");
    const author = message.member.user.username;

    if (!member) return message.channel.send("impossible de trouver l'utilisateur");

    if (!raison) return message.channel.send("Impossible d'expulser un member sans raison")

    const filter = (reaction, user) => user.id === message.author.id && !user.bot;

    message.react(emote.emojis.green_check_A);

    const collector = message.createReactionCollector(filter, {time: 60000});

    collector.on("collect", ((reaction, user) => {

        if (reaction.emoji.id === emote.emoji_id.green_check_A) {

            member.kick();
            message.channel.send(`${member} a été kick.`)
            const embed = new MessageEmbed()
                .setColor("#f4900c")
                .setTitle(`${emote.emojis.orange_circle} **Kick d'un joueur**`)
                .addFields(
                    {name: "Joueur :", value: member.user.tag},
                    {name: "Raison :", value: raison},
                    {name: "Par :", value: author}
                )
            message.guild.channels.cache.get(channels.sanctionLogsChannel).send(embed);
            message.delete();
        }
    }))
}
}