const {MessageEmbed} = require("discord.js");
const channels = require("../../channels.json");
const axios = require("axios");
const valorantModel = require("../../models/valorantSchema");

module.exports = {
    name: "test",
    category: "Information",
    aliases: [],
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

        try {

            const userID = message.member.id
            let valorantProfile = await valorantModel.findOne({id: userID});

            let rankImage, str = valorantProfile.name + "#" + valorantProfile.tag;

            for (let i = 1; i < args.length; i++)
                str += '%20' + args[i];

            const ID = str.toLowerCase();
            const playerID = ID.replace(/#/g, "%23");

            let trackerProfile = await axios.get("https://api.tracker.gg/api/v2/valorant/standard/profile/riot/iamsocringe%2300000")

        } catch (error) {
            console.error(error)
            return message.channel.send("Valorant Tracker est actuellement en maintenance. Je ne suis pas en mesure de récupérer vos statistiques.")
        }
    }
}









