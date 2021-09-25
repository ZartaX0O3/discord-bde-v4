const {MessageEmbed} = require("discord.js");
const channels = require("../../channels.json");
const emote = require("../../emojis.json");

module.exports = {
    name: "ban",
    alias: ["b"],
    cooldown: 5,
    description: "Commande de bannissement (Reservé admin)",
    usage: "*ban [id] [temps] [raison]",
    category: "Moderation",
    run: function (client, message, args) {

    if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply("Bah alors tu fait quoi bougrito ?")

    const author = message.member.user.username;
    const member = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
    let temps = args[1];
    args.shift();
    args.shift();
    let raison = args.join(" ");


    if (!member) {
        return message.reply("Aucun membre existant renseigné"); // Si aucune personne mentionné !
    }

    if (!member.bannable) return message.reply("Membre non bannissable");

    if (!temps || isNaN(temps)) {
        return message.reply("Vous devez indiqué un temps en seconde !"); // Si pas de temps ou pas du bon formats
    }

    if (!raison) {
        return message.reply("Vous devez indiqué une raison du ban !"); // Si pas de raison
    }

    const filter = (reaction, user) => user.id === message.author.id && !user.bot;

    message.react(emote.emojis.green_check_A);

    const collector = message.createReactionCollector(filter, {time: 60000});

    collector.on("collect", ((reaction, user) => {

        if (reaction.emoji.id === emote.emoji_id.green_check_A) {

            member.ban();
            message.channel.send(`${member.user.tag} a correctement été banni !`);
            const embed = new MessageEmbed()
                .setColor("#dd2e44")
                .setTitle(`${emote.emojis.red_circle} **Bannissement d'un joueur**`)
                .addFields(
                    {name: "Joueur :", value: member.user.tag},
                    {name: "Raison :", value: raison},
                    {name: "Temps :", value: `${temps}s`},
                    {name: "Par :", value: author}
                )
            message.guild.channels.cache.get(channels.sanctionLogsChannel).send(embed);
            message.delete();
            setTimeout(function () {
                message.guild.members.unban(member);
            }, temps * 1000);
        }
    }))
}
}
