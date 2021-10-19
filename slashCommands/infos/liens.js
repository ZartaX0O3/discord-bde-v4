const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");

module.exports = {
    name: "liens",
    description: "returns array of important links",
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {

        const embedLink = new MessageEmbed()
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
            .setAuthor(interaction.member.user.username, interaction.member.user.displayAvatarURL())
            .setFooter("© BDE ASCII", 'https://cdn.discordapp.com/attachments/712780211674152962/826756427837997086/setupGris.png')

        await interaction.reply({embeds: [embedLink], ephemeral: true});
    },
};