const {MessageEmbed} = require("discord.js");
const emote = require("../../../emojis.json");
const inventoryModel = require("../../../models/inventorySchema");

async function pickaxe(message, inventoryData){

    const first = new MessageEmbed()
        .setColor("#ff00ff")
        .addFields(
            {name: `Outils : `, value: `⛏️ Pioche`},
        )

    let prixCoins = 0, prixStone = 0, prixIron = 0, prixGold = 0;

    const niveauPioche = inventoryData.pickaxe;
    if(niveauPioche == 10) return message.reply("Niveau maximum atteint");          

    switch(inventoryData.pickaxe) {

        case 0 :

            prixCoins = 500;
            first.addFields(
                {name: `Niveau : `, value: niveauPioche},
                {name: `Prix d'amélioration `, value: prixCoins},
            )
            break;
                
        case 1 :

            prixCoins = 1000;
            prixStone = 100000;
            first.addFields(
                {name: `Niveau : `, value:  niveauPioche},
                {name: `Prix d'amélioration `, value: `${prixCoins} Coins et ${prixStone} Pierres.`},
            )
            break;

        case 2 :

            prixStone = 1000000;
            prixIron = 500000;
            prixGold = 300000;
            first.addFields(
                {name: `Niveau : `, value:  niveauPioche},
                {name: `Prix d'amélioration `, value: `${prixStone} Pierres, ${prixIron} Fer et ${prixGold} Or.`},
            )
            break;

        case 3 :

            prixStone = 100000000;
            prixIron = 5000000;
            prixGold = 3000000;
            first.addFields(
                {name: `Niveau : `, value:  niveauPioche},
                {name: `Prix d'amélioration `, value: `${prixStone} Pierres, ${prixIron} Fer et ${prixGold} Or.`},
            )
            break;

        case 4 :

            prixStone = 1000000000;
            prixIron = 50000000;
            prixGold = 30000000;
            prixCoins = 50000;
            first.addFields(
                {name: `Niveau : `, value: niveauPioche},
                {name: `Prix d'amélioration `, value: `${prixCoins} Coins, ${prixStone} Pierres, ${prixIron} Fer et ${prixGold} Or.`},
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

                if(prixStone > inventoryData.stone || prixIron > inventoryData.iron || prixGold > inventoryData.gold || prixCoins > inventoryData.coins) return message.reply("Ressources insuffisantes");

                switch(inventoryData.pickaxe) {

                    case 0 :

                        const response = await inventoryModel.findOneAndUpdate({ userID: message.author.id},{ $inc: { pickaxe: 1, coins: -prixCoins} });
                        msg.channel.send("Amélioration éfféctué !")
                        msg.delete()
                        break;    

                    case 1 :

                        const response1 = await inventoryModel.findOneAndUpdate({ userID: message.author.id},{ $inc: { pickaxe: 1, stone: -prixStone, coins: -prixCoins} });
                        msg.channel.send("Amélioration éfféctué !")
                        msg.delete()
                        break;     

                    case 2 :

                        const response2 = await inventoryModel.findOneAndUpdate({ userID: message.author.id},{ $inc: { pickaxe: 1, stone: -prixStone, iron: -prixIron, gold: -prixGold} });
                        msg.channel.send("Amélioration éfféctué !")
                        msg.delete()
                        break;  
                                
                    case 3 : 

                        const response3 = await inventoryModel.findOneAndUpdate({ userID: message.author.id},{ $inc: { pickaxe: 1, stone: -prixStone, iron: -prixIron, gold: -prixGold} });
                        msg.channel.send("Amélioration éfféctué !")
                        msg.delete()
                        break;  
                                

                    case 4 : 

                        const response4 = await inventoryModel.findOneAndUpdate({ userID: message.author.id},{ $inc: { pickaxe: 1, stone: -prixStone, iron: -prixIron, gold: -prixGold, coins: -prixCoins} }); 
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

module.exports = {pickaxe};