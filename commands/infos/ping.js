const { Client, CommandInteraction } = require("discord.js");

module.exports = {
        name: "ping",
        category: "Information",
        aliases: [],
        cooldown: 2,
        usage: "ping",
        description: "Renvoie de la latence BOT",
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

                message.channel.send(`🏓 Votre latence est de : ${Date.now() - message.createdTimestamp}ms`);
        }
};