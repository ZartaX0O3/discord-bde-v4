const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");

module.exports = {
    name: "liens",
    category: "Information",
    aliases: ["li","lien"],
    cooldown: 2,
    usage: "liens",
    description: "Affichage des liens important pour l'UCA",
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message) => {

        const embedLink = new MessageEmbed()
            .setColor("#ffd800")
            .setTitle("__Lien utile de l'IUT__")
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
            .setFooter("© BDE ASCII", 'https://cdn.discordapp.com/attachments/712780211674152962/826756427837997086/setupGris.png')

        message.channel.send(
            {embeds: [embedLink]}
        );
    }
}
