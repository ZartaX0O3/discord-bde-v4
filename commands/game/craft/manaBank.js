const {MessageEmbed} = require("discord.js");
const emote = require("../../../emojis.json");
const inventoryModel = require("../../../models/inventorySchema");

async function manaBank(message, inventoryData){

    const first = new MessageEmbed()
        .setColor("#ff00ff")
        .addFields(
            {name: `Outils : `, value: `⛏️ Pioche`},
        )

    let prixCoins = 0, prixStone = 0, prixIron = 0, prixGold = 0;

    const niveauMB = inventoryData.manaBank;

    switch(inventoryData.manaBank) {

        case 1 :
            prixCoins = 2000
            first.addFields(
                {name: `Niveau : `, value: niveauMB},
                {name: `Prix d'amélioration `, value: `${prixCoins} Coins`},
            )
            break;
        
        case 2 :
            prixStone = 500000;
            prixIron = 200000;
            prixGold = 150000;
            first.addFields(
                {name: `Niveau : `, value:  niveauMB},
                {name: `Prix d'amélioration `, value: `${prixStone} Pierre, ${prixIron} Fer et ${prixGold} Or.`},
            )
            break;

        case 3 :
            prixStone = 1000000;
            prixIron = 500000;
            prixGold = 300000;
            first.addFields(
                {name: `Niveau : `, value:  niveauMB},
                {name: `Prix d'amélioration `, value: `${prixStone} Pierres, ${prixIron} Fer et ${prixGold} Or.`},
            )
            break;
    }

    message.channel.send(first).then(msg => {
        msg.react(emote.emojis.green_check_A).then(r => {
            msg.react(emote.emojis.red_cross_A);


            const filter1 = (reaction, user) => user.id === message.author.id && !user.bot && reaction.emoji.id === emote.emoji_id.green_check_A;
            const filter2 = (reaction, user) => user.id === message.author.id && !user.bot && reaction.emoji.id === emote.emoji_id.red_cross_A;

            const checkCollector = msg.createReactionCollector(filter1, {time: 30000});
            const crossCollector = msg.createReactionCollector(filter2, {time: 30000});

            checkCollector.on("collect", async (r, u) => {

                if(prixStone > inventoryData.stone || prixIron > inventoryData.iron || prixGold > inventoryData.gold || prixCoins > profileData.coins) return message.reply("Ressources insuffisantes");

                switch(inventoryData.manaBank) {

                    case 1 :

                        const response1 = await inventoryModel.findOneAndUpdate({ userID: message.author.id},{ $inc: { manaBank: 1, coins: -prixCoins} });
                        msg.channel.send("Amélioration éfféctué !")
                        msg.delete()
                        break;  

                    case 2 :

                        const response2 = await inventoryModel.findOneAndUpdate({ userID: message.author.id},{ $inc: { manaBank: 1, stone: -prixStone, iron: -prixIron, gold: -prixGold} });
                        msg.channel.send("Amélioration éfféctué !")
                        msg.delete()
                        break;  
                        
                    case 3 : 

                        const response3 = await inventoryModel.findOneAndUpdate({ userID: message.author.id},{ $inc: { manaBank: 1, stone: -prixStone, iron: -prixIron, gold: -prixGold} });
                        msg.channel.send("Amélioration éfféctué !")
                        msg.delete()
                        break;  
                        
                }
            })

            crossCollector.on("collect", async (r, u) => {
                msg.delete();
            })
        })
    })
}

module.exports = {manaBank};