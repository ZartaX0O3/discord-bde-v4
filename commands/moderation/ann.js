const {MessageEmbed} = require("discord.js");
const channels = require("../../channels.json");
const emote = require("../../emojis.json");

module.exports = {
    name: "annonce",
    alias: ["ann"],
    cooldown: 5,
    description: "Commande de lancement d'annonces",
    usage: "*annonce Une annonce dingue",
    category: "Moderation",
    run: async function (client, message, args) {

    if (!message.member.permissions.has("ADMINISTRATOR")) return;

    let annonce = args.join(" ");

    const embed = new MessageEmbed()
        .setColor("#ffffff")
        .setTitle("**Rôles de jeux :**")
        .setDescription(`Voici la liste des rôles de jeux disponible, si vous souaitez en faire ajouter un la commande *idee est la pour ca !\n Toute demande sera étudiée puis après délibération le jeux pourra être ajouté\n\n __**Jeux disponibles :**__\n\nValorant : ${emote.game.id.valorant}\nCS:GO: ${emote.game.id.csgo}\nMinecraft : ${emote.game.id.minecraft}\nLeague of Legends: ${emote.game.id.lol}\nOverwatch: ${emote.game.id.overwatch}\nRocket League : ${emote.game.id.rocketleague}\nOsu : ${emote.game.id.osu}\nSummoners War : ${emote.game.id.summoner}`)
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))

    const msg = await message.guild.channels.cache.get(channels.game_channel).send(embed)

    const emGames = Object.values(emote.game.id)
    for (const em of emGames) {
        await msg.react(em)
    }
}
}
