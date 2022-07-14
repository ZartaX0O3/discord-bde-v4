const {MessageEmbed} = require("discord.js");
const QuickChart = require('quickchart-js');
const axios = require("axios");
const valorantModel = require("../../models/valorantSchema");
const emote = require("../../emojis.json");
const roles = require("../../roles.json");

module.exports = {
    name: "valorant",
    category: "Information",
    aliases: ["valo"],
    cooldown: 2,
    usage: "valorant name id",
    description: "Voir les statistiques des joueurs du serveur a propos de valorant",
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

        if(!args[0]) {

            const userID = message.member.id
            let valorantProfile = await valorantModel.findOne({id: userID});

            if(!valorantProfile) {

                const noAccountEmbed = new MessageEmbed()
                    .setColor('#d1390f')
                    .setAuthor(message.member.user.username, 'https://cdn.discordapp.com/attachments/834195818080108564/932365602427920404/x-png-35400.png')
                    .setFooter('Developed by ZartaX0O3')
                    .addFields(
                        {
                            name: 'Error Status',
                            value: "```diff\n" + "Please connect your VALORANT account to your \nDiscord ID using *linkAccount [name] [tag] to view player statistics." +
                                "\n\nExample: /linkAccount Iamsocringe 00000\n```",
                            inline: true
                        },
                    );

                return message.channel.send({embeds : [noAccountEmbed]})
            }

            let rankImage;

            switch(valorantProfile.currenttierpatched){
                case "Iron 1" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/7/7c/Iron_1_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203005"
                    break;

                case "Iron 2" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/b/bf/Iron_2_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203053"
                    break;

                case "Iron 3" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/7/79/Iron_3_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203101"
                    break;

                case "Bronze 1" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/b/bd/Bronze_1_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203119"
                    break;

                case "Bronze 2" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/c/c7/Bronze_2_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203140"
                    break;

                case "Bronze 3" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/a/ae/Bronze_3_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203313"
                    break;

                case "Silver 1" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/8/8a/Silver_1_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203408"
                    break;

                case "Silver 2" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/e/e9/Silver_2_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203410"
                    break;

                case "Silver 3" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/d/d7/Silver_3_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203413"
                    break;

                case "Gold 1" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/6/65/Gold_1_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203413"
                    break;

                case "Gold 2" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/0/02/Gold_2_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203415"
                    break;

                case "Gold 3" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/2/27/Gold_3_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203417"
                    break;

                case "Platinum 1" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/9/96/Platinum_1_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203419"
                    break;

                case "Platinum 2" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/5/5a/Platinum_2_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203606"
                    break;

                case "Platinum 3" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/1/1b/Platinum_3_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203607"
                    break;

                case "Diamond 1" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/a/ae/Diamond_1_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203609"
                    break;

                case "Diamond 2" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/6/6a/Diamond_2_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203610"
                    break;

                case "Diamond 3" :
                    rankImage = "https://static.wikia.nocookie.net/valorant/images/0/01/Diamond_3_Rank.png/revision/latest/scale-to-width-down/225?cb=20200623203611"
                    break;
            }

            let rankName = valorantProfile.rank, Kills=0, Deaths=0, Assists=0, MostKills = 0, Playtime=0, player, nbVictory = 0, nbDefeat = 0, playerColor, KDA, KDR;

            axios.get('https://api.henrikdev.xyz/valorant/v3/matches/eu/' + valorantProfile.name + '/' + valorantProfile.tag + '?filter=competitive')
                .then(async function (response) {
                    try {

                        for(let i = 0; i < 5; i++){
                            Playtime += response.data.data[i].metadata.game_length;
                            let j = 0;

                            while(player !== valorantProfile.name){
                                player = response.data.data[i].players.all_players[j].name;
                                playerColor = response.data.data[i].players.all_players[j].team.toLowerCase()
                                j++;
                            }

                            player = null;


                            if((response.data.data[i].teams.red.has_won === true && playerColor === "red") || (response.data.data[i].teams.blue.has_won === true && playerColor === "blue")) nbVictory++;
                            else nbDefeat++;

                            Kills += response.data.data[i].players.all_players[j-1].stats.kills;
                            Deaths += response.data.data[i].players.all_players[j-1].stats.deaths;
                            Assists += response.data.data[i].players.all_players[j-1].stats.assists;

                            if(MostKills > response.data.data[i].players.all_players[j-1].stats.kills) continue;
                            else MostKills = response.data.data[i].players.all_players[j-1].stats.kills;

                        }

                        KDR = parseFloat((Kills/Deaths).toFixed(2))
                        KDA = parseFloat(((Kills + Assists)/Deaths).toFixed(2))

                        let hours = Math.floor(Playtime / 60 / 60);
                        let minutes = Math.floor(Playtime / 60) - (hours * 60);
                        let seconds = Playtime % 60;
                        let formatted = hours + ':' + minutes + ':' + seconds;

                        const Embed = new MessageEmbed()
                            .setColor("#070707")
                            .setAuthor(message.member.user.username, valorantProfile.cardURL_small)
                            .setThumbnail(rankImage)
                            .setTitle(`Valorant Player Stats`)
                            .setDescription("In-game stats from the last 5 games")
                            .setFooter('Developed by ZartaX0O3')
                            .addFields(
                                { name: 'KDR', value: "```yaml\n" + KDR + "\n```", inline: true },
                                { name: 'KDA', value: "```yaml\n" + KDA  + "\n```", inline: true },
                                { name: 'Rank ', value: "```grey\n" + valorantProfile.currenttierpatched + "\n```", inline: true },
                                { name: 'Kills', value: "```yaml\n" + Kills + "\n```", inline: true },
                                { name: 'Deaths', value: "```yaml\n" + Deaths + "```", inline: true },
                                { name: 'Assists', value: "```yaml\n" + Assists + "\n```", inline: true },
                                { name: 'Most Kills', value: "```yaml\n" + MostKills + "\n```", inline: true },
                                { name: 'Playtime', value: "```yaml\n" + formatted + "\n```", inline: true },
                                {
                                    name: 'Win Rate', value: nbVictory/(nbVictory+nbDefeat)*100 + "% ```yaml\n" + "    W: "
                                        + nbVictory + "   |   L: " + nbDefeat + "\n```", inline: false
                                },
                            )
                            .setImage(valorantProfile.cardURL_wide)

                        message.channel.send({embeds : [Embed]})

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
            }


    }
}

