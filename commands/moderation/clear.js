const {MessageEmbed} = require("discord.js");
const channels = require("../../channels.json");
const emote = require("../../emojis.json");

module.exports = {
    name: "clear",
    category: "Moderation",
    aliases: [],
    cooldown: 2,
    usage: "clear <<number>>",
    description: "Clear les x derniers message du channel (Max 2 semaines)",
    memberpermissions: ["Permissions.FLAGS.MANAGE_MESSAGES"],
    requiredroles: [],
    alloweduserids: [],
    minargs: 1, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 1, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args) => {

    if (!args[0]) return message.channel.send("Vous devez mettre un nombre de messages à supprimer");

    if (isNaN(args[0])) return message.channel.send("Le nombre de message est invalide");

    if (parseInt(args[0]) <= 0 || parseInt(args[0]) >= 99) return message.channel.send("Le nombre de messages à supprimer doit être compris entre 1 et 99.");

    await message.channel.bulkDelete(args[0]+1);

    const embed = new MessageEmbed()
        .setColor("#f4cc5c")
        .setTitle(`${emote.emojis.yellow_circle} **Suppresion de messages**`)
        .addFields(
            {name: "Nombres de messages : ", value: `${args[0]}`},
            {name: " ID Salon : ", value: `${message.channel.id}`},
            {name: " Salon : ", value: `${message.channel.name}`},
            {name: "Par :", value: `${message.author}`}
        )

    message.guild.channels.cache.get(channels.sanctionLogsChannel).send({embeds: [embed]})
    message.channel.send(`Vous avez supprimé ${args[0]} message(s)`).then(msg => {
        setTimeout(() => {
            msg.delete()
        }, 5000);
    });
}
}