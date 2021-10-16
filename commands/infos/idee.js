const {MessageEmbed} = require("discord.js");
const channels = require("../../channels.json");

module.exports = {
    name: "idee",
    category: "Information",
    aliases: ["idees"],
    cooldown: 2,
    usage: "idee <<your idea>>",
    description: "Envoie d'une idée au staff du serveur",
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    minargs: 1, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 1, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args) => {
    let proposition = args.join(" ");

    const embed = new MessageEmbed()
        .setAuthor(message.member.user.username)
        .setTitle('Proposition reçu :')
        .setDescription(proposition)
        .setTimestamp()
        .setColor('#ff6700')

    message.guild.channels.cache.get(channels.sanctionLogsChannel).send({ embeds: [embed]});

    message.reply("Votre proposition a bien été envoyé !");
    message.delete();
    }
}