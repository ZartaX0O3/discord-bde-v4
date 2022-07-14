const {MessageEmbed} = require("discord.js");
const QuickChart = require('quickchart-js');
const axios = require("axios");
const valorantModel = require("../../models/valorantSchema");
const emote = require("../../emojis.json");
const roles = require("../../roles.json");

module.exports = {
    name: "link",
    category: "Information",
    aliases: ["valorantLink", "updateAccount", "linkAccount"],
    cooldown: 2,
    usage: "*linkAccount name tag",
    description: "Permet de lier son compte Valorant aux BOT pour ensuite recevoir ses statistiques",
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    minargs: 2, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 2, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args) => {

        if(args[0] && args[1]){

            let dataPlayer;

            axios.get('https://api.henrikdev.xyz/valorant/v1/account/' + args[0] + '/' + args[1])
                .then(async function (response) {
                    try {
                        dataPlayer = response.data.data.card

                    } catch (err) {
                        console.log(err);
                    }
                })
                .catch(function (error) {

                    const errorEmbed = new MessageEmbed()
                        .setColor('#d1390f')
                        .setAuthor(message.member.user.username, 'https://cdn.discordapp.com/attachments/834195818080108564/932365602427920404/x-png-35400.png')
                        .setFooter('Developed by ZartaX0O3')
                        .addFields(
                            {
                                name: 'Error Status',
                                value: "```diff\n" + "Please ensure the account you are trying to view has" +
                                    " logged into tracker.gg/valorant !\n\nExample:\n1. Click 'Sign in with Riot ID'\n2.\n\n"
                                    + "\n```",
                                inline: true
                            },
                        )

                    message.channel.send({embeds : [errorEmbed]});
                    message.delete();
                });


            axios.get('https://api.henrikdev.xyz/valorant/v1/mmr/eu/' + args[0] + '/' + args[1])
                .then(async function (response) {



                    try {
                        let valorantProfile = await valorantModel.findOne({tag: args[1], name: args[0]});
                        if (!valorantProfile) {
                            let valorant = await valorantModel.create({
                                id: message.member.id,
                                tag: args[1],
                                name: args[0],
                                currenttierpatched: response.data.data.currenttierpatched,
                                ranking_in_tier: response.data.data.ranking_in_tier,
                                elo: response.data.data.elo,
                                cardURL_small: dataPlayer.small,
                                cardURL_large: dataPlayer.large
                            })

                            await valorant.save();
                            console.log("-- Valorant account linked and created in database --")

                            const linkEmbed = new MessageEmbed()
                                .setColor('RANDOM')
                                .setFooter('Developed by ZartaX0O3')
                                .addFields(
                                    {
                                        name: 'Success !',
                                        value: 'Successfully linked the VALORANT account `' + `${args[0]}#${args[1]}` + '` to your Discord ID.\n\n',
                                        inline: true
                                    },
                                )

                            message.channel.send({embeds : [linkEmbed]});
                            message.delete();
                        }
                        else{
                            valorantProfile = await valorantModel.findOneAndUpdate({tag: args[1], name: args[0]},
                                {
                                    currenttierpatched: response.data.data.currenttierpatched,
                                    ranking_in_tier: response.data.data.ranking_in_tier,
                                    elo: response.data.data.elo,
                                    cardURL_small: dataPlayer.small,
                                    cardURL_large: dataPlayer.large
                                });

                            console.log("-- Valorant account linked and updated in database --")
                        }

                    } catch (err) {
                        console.log(err);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}

