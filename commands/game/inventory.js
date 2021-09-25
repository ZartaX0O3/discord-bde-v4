const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");
const inventoryModel = require("../../models/inventorySchema");
const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "inventory",
    alias: ["inv"],
    cooldown: 5,
    description: "Commande d'inventaire EVE'",
    usage: "*inventory",
    category: "Jeux",
    run: async function (client, message, args, profileData, inventoryData) {
      
        if(!inventoryData) return message.reply("Vous  dezvez d'abord vous créer un profil avec *nouveau");

        let manaSec = inventoryData.manaBank;
        let stone = 0, iron = 0, gold = 0, manaBankL;

        if(manaSec == 0) manaSec = 45, manaBankL = 100;
        else if(manaSec == 1) manaSec = 40, manaBankL = 150;
        else if(manaSec == 2) manaSec = 38, manaBankL = 200;
        else if(manaSec == 3) manaSec = 35, manaBankL = 300;
        else if(manaSec == 4) manaSec = 32, manaBankL = 400;
        else if(manaSec == 5) manaSec = 30, manaBankL = 500;
        else if(manaSec == 6) manaSec = 28, manaBankL = 600;
        else if(manaSec == 7) manaSec = 26, manaBankL = 750;
        else if(manaSec == 8) manaSec = 24, manaBankL = 900;
        else if(manaSec == 9) manaSec = 22, manaBankL = 1000;
        else if(manaSec == 10) manaSec = 20, manaBankL = 1100;

        if(inventoryData.stone > 1000000) {
            stone = Math.floor((inventoryData.stone / 1000000))+"M"
        }
        else if(inventoryData.stone > 1000) {
            stone = Math.floor((inventoryData.stone / 1000))+"k"
        }
        else {
            stone = inventoryData.stone
        }

        if(inventoryData.iron > 1000000) {
            iron = Math.floor((inventoryData.iron / 1000000))+"M"
        }
        else if(inventoryData.iron > 1000) {
            iron = Math.floor((inventoryData.iron / 1000))+"k"
        }
        else {
            iron = inventoryData.iron
        }

        if(inventoryData.gold > 1000000) {
            gold = Math.floor((inventoryData.gold / 1000000))+"M"
        }
        else if(inventoryData.gold > 1000) {
            gold = Math.floor((inventoryData.gold / 1000))+"k"
        }
        else {
            gold = inventoryData.gold
        }

        const inventory = new MessageEmbed()
            .setTitle(`**----- Inventaire de ${message.author.username} -----**`)
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            .addFields(
                 {name:`${emote.ressources.mana} **Mana** [+1/${manaSec}s]`, value: `${inventoryData.mana} *[${inventoryData.mana}/${manaBankL}]*`, inline: true},
                 //{name: `${emote.ressources.xp} **Level :** (XP : ${inventoryData.xp})`, value: `${Math.log(inventoryData.xp)} `, inline: true},
                 {name: '\u200b', value: '\u200b', inline: true},
                 {name:`❤️ **HP :** [+1/45s]`, value: `${inventoryData.hp} *[${inventoryData.hp}/30]*` ,inline: true},
                 {name: `${emote.ressources.void} **Void Energy** [+1/45s]`, value: `${inventoryData.void_energy}`, inline: true},
                 {name: '\u200b', value: '\u200b', inline: true},
                 {name: `${emote.ressources.valkyrie} **Valkyrie :**`, value: `${inventoryData.valkyrie}`, inline: true},
                 {name:"**Outils** ", value: `⛏️ Pioche : ${inventoryData.pickaxe}\n⚔️ Epée : ${inventoryData.sword}`, inline: true},
                 {name: '\u200b', value: '\u200b', inline: true},
                 {name:"**Machines** ", value: `🌟 Mana Bank : ${inventoryData.manaBank}\n${emote.ressources.stone} Générateur de Stone : ${inventoryData.stoneGenerator}`, inline: true},
                 {name: "**Ressources (1)**", value: `${emote.ressources.stone} Pierre : ${stone}\n${emote.ressources.iron} Fer : ${iron}\n${emote.ressources.gold} Or : ${gold}`, inline: true},
                 {name: '\u200b', value: '\u200b', inline: true},
                 {name: "**Bank & Coins**", value: `🏛️ Banque : ${profileData.bank}\n💰 Coins : ${profileData.coins}`, inline: true}
            )
        
        const coffrefort = new MessageEmbed()
                .setTitle(`**----- Coffre fort de ${message.author.username} -----**`)
                .addFields(
                    {name: `${emote.ressources.chestS} **Orbe de rareté Epsilon :**`, value: `Nombre : ${inventoryData.epsilon}`},
                    {name: `${emote.ressources.chestD} **Orbe de rareté Delta :**`, value: `Nombre : ${inventoryData.delta}`},
                    {name: `${emote.ressources.chestC} **Orbe de rareté Gamma :**`, value: `Nombre : ${inventoryData.gamma}`},
                    {name: `${emote.ressources.chestB} **Orbe de rareté Beta :**`, value: `Nombre : ${inventoryData.beta}`},
                    {name: `${emote.ressources.chestA} **Orbe de rareté Alpha :**`, value: `Nombre : ${inventoryData.alpha}`}
                )

        message.channel.send(inventory);
        message.channel.send(coffrefort);
        
    }
}
