const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");

module.exports = {
    name: "bandef",
    alias: ["bd"],
    cooldown: 5,
    description: "Commande de bannissement def. (Reservé admin)",
    usage: "*bandef [id] [raison]",
    category: "Moderation",
    run: function (client, message, args) {

    if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("**Permission Admin nécessaire**")
    
    const author = message.member.user.username;
    const member = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
    args.shift()
    let raison = args.join(" ")

    if (!member) return message.channel.send("Aucune personne selectionnée")

    const first = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setColor("#fc0000")
        .setDescription(`Etes vous sûr de vouloir bannir ${member} ?`)

    message.channel.send(first).then(msg => {

        msg.react(emote.emojis.green_check_A);

        const filter = (reaction, user) => user.id === message.author.id && !user.bot && reaction.emoji.id === emote.emoji_id.green_check_A;
        const checkCollector = msg.createReactionCollector(filter, {time: 60000});

        checkCollector.on("collect", (r, u) => {
            member.ban()
            const second = new MessageEmbed()
                .setColor("#dd2e44")
                .setTitle(`${emote.emojis.red_circle} **Bannissement d'un joueur**`)
                .addFields(
                    {name: "Joueur :", value: member.user.tag},
                    {name: "Raison :", value: raison},
                    {name: "Temps :", value: `Définitif`},
                    {name: "Par :", value: author}
            )
            msg.edit(second);
        })
    })
}
}