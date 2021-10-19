const {MessageEmbed} = require("discord.js");
const channels = require("../../channels.json");
const emote = require("../../emojis.json");
const { GetUser } = require("../../handler/functions")

module.exports = {
    name: "ban",
    category: "Moderation",
    aliases: [],
    cooldown: 10,
    usage: "ban <<ID>>",
    description: "Ban d'un joueur",
    memberpermissions: ["ADMINISTRATOR"],
    requiredroles: [],
    alloweduserids: [],
    minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 2, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args) => {

        const author = message.member.user.username;
        let user = message.guild.members.cache.get(args[0]);

        let temps = args[1];
        args.shift();
        args.shift();
        let raison = args.join(" ");

        if (!user) return message.reply("Aucun membre existant renseigné"); // Si aucune personne mentionné !
        if (!user.bannable)  return message.reply("Membre non bannissable");
        if (!raison) return message.reply("Vous devez indiqué une raison du ban !"); // Si pas de raison

        if (temps) {
            await user.ban();
            message.channel.send(`${user.user.tag} a correctement été banni !`);
            const embed = new MessageEmbed()
                .setColor("#dd2e44")
                .setTitle(`${emote.emojis.red_circle} **Bannissement d'un joueur**`)
                .addFields(
                    {name: "Joueur :", value: member.user.tag},
                    {name: "Raison :", value: raison},
                    {name: "Temps :", value: `${temps}s`},
                    {name: "Par :", value: author}
                );

            message.guild.channels.cache.get(channels.sanctionLogsChannel).send({embeds: [embed]});
            message.delete();
            setTimeout(function () {
                message.guild.members.unban(user);
            }, temps * 1000);
        }
        else{
            await user.ban();
            message.channel.send(`${user.user.tag} a correctement été banni !`);
            const embed = new MessageEmbed()
                .setColor("#dd2e44")
                .setTitle(`${emote.emojis.red_circle} **Bannissement d'un joueur**`)
                .addFields(
                    {name: "Joueur :", value: member.user.tag},
                    {name: "Raison :", value: raison},
                    {name: "Par :", value: author}
                );

            message.guild.channels.cache.get(channels.sanctionLogsChannel).send({embeds: [embed]});
            message.delete();
        }
    }
}
