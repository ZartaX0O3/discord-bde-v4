const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");

module.exports = {
    name: "liens",
    alias: ["li","lien","link"],
    cooldown: 5,
    description: "Commande d'envoie des liens importants",
    usage: "*liens",
    category: "Commandes utiles",
    run: function (client, message, args) {

    const embed = new MessageEmbed()
        .setColor("#ffd800")
        .setTitle("__Lien utile de l'iut__")
        .addFields(
            { name: `${emote.emojis.red_ckeck} Lien vers l\'ENT :`, value: 'https://ent.uca.fr/core/home/'},
            { name: `${emote.emojis.red_ckeck} Lien vers Odin :`, value: 'https://odin.iut.uca.fr' },
            { name: `${emote.emojis.red_ckeck} Lien vers votre homeweb :`, value: 'https://homeweb.iut-clermont.uca.fr/' },
            { name: `${emote.emojis.red_ckeck} Lien vers Opale :`, value: 'https://opale.iut-clermont.uca.fr/info/wiki/doku.php' },
            { name: `${emote.emojis.red_ckeck} Lien vers la forge :`, value: 'https://forge.clermont-universite.fr/' },
            { name: `${emote.emojis.red_ckeck} Lien vers le gitlab :`, value: 'https://gitlab.iut-clermont.uca.fr/' },
            { name: `${emote.emojis.red_ckeck} Lien vers le rocket de l\'uca`, value: 'https://rocket.dsi.uca.fr/home' },
            { name: `${emote.emojis.red_ckeck} Lien vers guacamole :`, value: 'https://guacamole.iut-clermont.uca.fr/#/' },
            { name: `${emote.emojis.red_ckeck} Lien vers Stancy :`, value: 'https://sancy.iut-clermont.uca.fr/~lafourcade/PAPERS/PDF/Livret-Cours-BD-2021-2022.pdf' },
        )
        .setAuthor(message.member.user.username, message.member.user.displayAvatarURL())
        .setFooter("© Set'UP", 'https://cdn.discordapp.com/attachments/712780211674152962/826756427837997086/setupGris.png')

    message.channel.send(embed);
    }
}
