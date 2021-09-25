const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");
const inventoryModel = require("../../models/inventorySchema");

function numIs(a){
    return (!isNaN(parseFloat(a)) && isFinite(a));
}

module.exports = {
    name: "mine",
    alias: ["mi"],
    cooldown: 1,
    description: "Commande de minage EVE",
    usage: "*mine [nbr de mana]",
    category: "Jeux",
    run: async function (client, message, args, profileData, inventoryData) {
        
        if(!inventoryData) return message.reply("Vous  dezvez d'abord vous créer un profil avec *nouveau");
        
        let manaUse = args[0];

        if(manaUse === "a") { 
            manaUse = inventoryData.mana 
        }
        
        if(manaUse > inventoryData.mana || manaUse < 0) return message.reply("vous n'avez pas assez de mana");

        if(!(parseFloat(manaUse) == parseInt(manaUse)) && !isNaN(manaUse)) return message.reply("un nombre entier !")

        if(!numIs(manaUse)) return message.reply("un nombre marcherais beaucoup mieux");

        if(!manaUse) return message.reply("veuillez saisir un nombre de mana à miner");

        if(!manaUse || isNaN(manaUse)) return message.reply("uniquement un nombre entier !");
        
        let stoneG = 0, ironG = 0, goldG = 0;
        let math1, math2, math3;
        let multiplicateur;

        for(let i = 0 ; i < manaUse ; i++) {

            if(inventoryData.pickaxe != 0) {
                 multiplicateur = 1 + (inventoryData.pickaxe /10) 
            }
            else { multiplicateur = 1 }

            math1 = parseInt((Math.floor(Math.random() * 1500) + 1) * multiplicateur);
            math2 = parseInt((Math.floor(Math.random() * 300) + 1) * multiplicateur);
            math3 = parseInt((Math.floor(Math.random() * 100) + 1) * multiplicateur);
            stoneG = stoneG + math1;
            ironG = ironG + math2;
            goldG = goldG + math3;
        }
        const response = await inventoryModel.findOneAndUpdate(
            {
                userID: message.author.id,
            },
            {
                $inc: {
                    mana: -manaUse,
                    stone: stoneG,
                    iron: ironG,
                    gold: goldG,
                }
            }
        );
        const embed = new MessageEmbed()
            .setTitle("**Ressources minées :**")
            .addFields(
                {name : `⭐ **Mana utilisés :**`, value: `${manaUse}`},
                {name: `${emote.ressources.stone} **Pierre :**`, value: stoneG},
                {name: `${emote.ressources.iron} **Fer :**`, value: ironG},
                {name: `${emote.ressources.gold} **Or :**`, value: goldG},

            )
        message.channel.send(embed);
        message.delete();
    }
}