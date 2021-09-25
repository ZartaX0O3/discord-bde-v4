const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");
const inventoryModel = require ("../../models/inventorySchema");
const bossModel = require("../../models/bossSchema");

const userStreaks = new Map()

async function death(message, msg){
    message.reply("Vous avez essayé de frapper dans le vide, étant donné que vous êtes un fragile vous en êtes mort...")
        const response = await inventoryModel.findOneAndUpdate(
            {
                userID: message.author.id,
            },
            {
                $set: {
                    hp: 0,
                }
            }
        );
    userStreaks.delete(message.author.id);
    msg.delete();
}

module.exports = {
    name: "tower",
    alias: ["to"],
    cooldown: 5,
    description: "Commande de la tower EVE",
    usage: "*tower",
    category: "Jeux",
    run: async function (client, message, args, profileData, inventoryData) {

        let userStreak;

        if (!userStreaks.has(message.author.id)) {

            userStreaks.set(message.author.id, "oui")

        } else {
            return message.reply("Vous ne pouvez pas lancer deux commandes en mêmes temps !")            
        }

        if(args[0] == "up"){
            if(inventoryData.boss_max == inventoryData.boss){
                message.reply("Vous n'avez pas encore combattu le boss de la salle !");
                msg.delete();
            }
            else{
                const response = await inventoryModel.findOneAndUpdate(
                    {
                        userID: message.author.id,
                    },
                    {
                        $inc: {
                            boss: 1,
                        }
                    }
                );
            }
            userStreaks.delete(message.author.id);
            return message.reply("Passage éffectué !")
        }

        const WIDTH = 7;
        const HEIGHT = 7;
        const emoji = '⬛'
        const gameBoard = [];
        const player = {x: 3, y: 3};
        const validation = {x: Math.floor(Math.random() * (6 - 0)) , y: Math.floor(Math.random() * (6 - 0)) };
        var passage = {x: Math.floor(Math.random() * (6 - 0)) , y: Math.floor(Math.random() * (6 - 0))};

        if(passage == validation){
            passage = {x: Math.floor(Math.random() * (6 - 0)) , y: Math.floor(Math.random() * (6 - 0))};
        }

        bossData = await bossModel.findOne({ bossNumber: inventoryData.boss});
        emoteBoss = bossData.bossNumber;

        for (let x = 0; x < WIDTH + 1; x++) {
            for( let y = 0; y < HEIGHT + 1; y++) {
                gameBoard[y * WIDTH + x] = emoji;
            }

        }

        const gameBoardtoString = () => {

            let str = ""

            for(let x = 0; x < WIDTH; x++) {

                for(let y = 0; y < HEIGHT; y++) {

                    if (validation.x === x && validation.y === y) {
                        str += bossData.bossPP;
                    }
                    else if(x == player.x && y == player.y) {
                        str += '💂🏼';
                    }
                    else {
                        str += gameBoard[y * WIDTH + x];
                    }

                }
                str += "\n"
            }
            return str;
        }

        const embed = new MessageEmbed()
            .setTitle(`Tower : Boss numéro ${inventoryData.boss}`)
            .setDescription(gameBoardtoString())
        message.channel.send(embed).then(msg => {
            msg.react("◀️");
            msg.react("🔽");
            msg.react("🔼");
            msg.react("▶️");
            msg.react("⚔️");

            const backwardsFilter = (reaction, user) => reaction.emoji.name === '🔽' && user.id === message.author.id;
            const forwardsFilter = (reaction, user) => reaction.emoji.name === '🔼' && user.id === message.author.id;
            const leftFilter = (reaction, user) => reaction.emoji.name === '◀️' && user.id === message.author.id;
            const rightFilter = (reaction, user) => reaction.emoji.name === '▶️' && user.id === message.author.id;
            const confirmFilter = (reaction, user) => reaction.emoji.name === '⚔️' && user.id === message.author.id;

            const backwards = msg.createReactionCollector(backwardsFilter, {time: 30000});
            const forwards = msg.createReactionCollector(forwardsFilter, {time: 30000});
            const right = msg.createReactionCollector(rightFilter, {time: 30000});
            const left = msg.createReactionCollector(leftFilter, {time: 30000});
            const confirm = msg.createReactionCollector(confirmFilter, {time: 30000});

            left.on('collect', (r, u) => {
                let nextY = player.y - 1;
                if(nextY < 0) {
                    message.reply("Vous venez de tomber de la tour...");
                    message.delete();
                    userStreaks.delete(message.author.id);
                    return;
                } 
                player.y = nextY

                embed.setFooter("")
                embed.setDescription(gameBoardtoString())
                msg.edit(embed)
                r.users.remove(u.id)

            })

            right.on('collect', (r, u) => {
                let nextY = player.y + 1;
                if(nextY >= WIDTH) {
                    message.reply("Vous venez de tomber de la tour...");
                    message.delete();
                    userStreaks.delete(message.author.id);
                    return;
                } 
                player.y = nextY

                embed.setFooter("")
                embed.setDescription(gameBoardtoString())
                msg.edit(embed)
                r.users.remove(u.id)
            })

            forwards.on('collect', (r, u) => {
                let nextX = player.x - 1;
                if(nextX < 0) {
                    message.reply("Vous venez de tomber de la tour...");
                    message.delete();
                    userStreaks.delete(message.author.id);
                    return;
                } 
                player.x = nextX

                embed.setFooter("")
                embed.setDescription(gameBoardtoString())
                msg.edit(embed)
                r.users.remove(u.id)
            })

            backwards.on('collect', (r, u) => {
                let nextX = player.x + 1;
                if(nextX >= HEIGHT) {
                    message.reply("Vous venez de tomber de la tour...");
                    message.delete();
                    userStreaks.delete(message.author.id);
                    return;
                }
                player.x = nextX

                embed.setFooter("")
                embed.setDescription(gameBoardtoString())
                msg.edit(embed)
                r.users.remove(u.id)
            })

            confirm.on('collect', async (r, u) => {
                if(validation.x == player.x && validation.y == player.y) { 

                        let bossHP = bossData.bossHP, bossHPmax = bossData.bossHP, bossAttack = bossData.attack;
                        let userHP = inventoryData.hp, userHPmax = inventoryData.hp, userAttack = inventoryData.attack, i = 2, bossName = bossData.bossName;
                        if(userHP <=0){
                            userStreaks.delete(message.author.id);
                            return message.reply("Vous n'avez  plus de vie");
                        }

                        let messageCombat = `**TOURS 1** :\n**${bossName} ${bossHP}/${bossHPmax}**\n`
                        messageCombat += `${bossName} attaque ${message.author.tag} qui perd ${bossAttack} HP !\n`
                        userHP = userHP-bossAttack;
                        messageCombat += `**${message.author.tag} ${userHP}/30**\n`
                        messageCombat += `${message.author.tag} attaque ${bossName} qui perd ${userAttack} HP !\n`
                        bossHP = bossHP-userAttack
                        messageCombat += `**---\*---**\n`

                        while(userHP > 0 && bossHP > 0) {
                            userHP = userHP-bossAttack;
                            i++
                            bossHP = bossHP-userAttack;

                        }

                        if(userHP <= 0) {

                            messageCombat += `**TOURS ${i}** :\n${bossName} gagne le combat ! 0/${bossHPmax}`
                            let HPperdu = userHPmax-userHP;
                            const response = await inventoryModel.findOneAndUpdate(
                                {
                                    userID: message.author.id,
                                },
                                {
                                    $inc: {
                                        hp: -HPperdu
                                    }
                                }
                            );
                        }
                        
                        else {
                            messageCombat += `**👑 ${message.author.tag}** gagne le combat ! ${userHP}/${userHPmax}`
                            messageCombat += `**\nVous pouvez passer au boss supérieur !**`

                            let HPperdu = userHPmax-userHP;
                            const boss_level = inventoryData.boss+1;

                            const response1 = await inventoryModel.findOneAndUpdate({ userID: message.author.id }, { $inc: { hp: -HPperdu }});
                            const response2 = await inventoryModel.findOneAndUpdate({ userID: message.author.id },{ $set: { boss_max: boss_level }});
                        }
                        msg.delete();
                        userStreaks.delete(message.author.id);
                        return message.channel.send(messageCombat);
                }
                else {
                    death(message, msg);
                    return;
                }
            })
        })
    }
}
