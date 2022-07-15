const {MessageEmbed} = require("discord.js");
const QuickChart = require('quickchart-js');
const axios = require("axios");
const valorantModel = require("../../models/valorantSchema");
const emote = require("../../emojis.json");
const roles = require("../../roles.json");

module.exports = {
    name: "unlink",
    category: "Information",
    aliases: ["valorantUnlink", "unlinkAccount"],
    cooldown: 2,
    usage: ">unlinkAccount",
    description: "Permet de délier son compte Valorant aux BOT",
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args) => {

        const playerID = message.member.user.id
        let valorantProfile = await valorantModel.findOneAndDelete({id: playerID});

        if(valorantProfile){
            const unlinkEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setFooter('Developed by ZartaX0O3')
                .addFields(
                    {
                        name: 'Done !',
                        value: 'Successfully unlinked the VALORANT account `' + `${args[0]}#${args[1]}` + '` to your Discord ID.\n\n',
                        inline: true
                    },
                )

            message.channel.send({embeds : [unlinkEmbed]})
        }
        else {
            const errorEmbed = new MessageEmbed()
                .setColor('#d1390f')
                .setAuthor(message.member.user.username, 'https://cdn.discordapp.com/attachments/834195818080108564/932365602427920404/x-png-35400.png')
                .setFooter('Developed by ZartaX0O3')
                .addFields(
                    {
                        name: 'Error Status',
                        value: "```diff\n" + "Please ensure you have already link an account before" + "\n```",
                        inline: true
                    },
                )

            message.channel.send({embeds : [errorEmbed]})
        }
    }
}

