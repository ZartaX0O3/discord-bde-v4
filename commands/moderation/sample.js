const {channelMention} = require("@discordjs/builders");
module.exports = {
    name: "sample",
    category: "Moderations",
    aliases: [],
    cooldown: 10,
    usage: "sample ID",
    description: "Ajout d'un membre au sample channel",
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: ["291698040027480064","376403187776618505","223491526771212289"],
    minargs: 1, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 1, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "non", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args) => {


        if(message.channel.id !== "875477158447960106") return;

        await message.channel.permissionOverwrites.edit(args[0], {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        })

        message.channel.send("Done bg")


    }
}
