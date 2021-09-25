const {MessageEmbed} = require("discord.js");
const channels = require("../../channels.json");
const inventoryModel = require("../../models/inventorySchema");

module.exports = {
    name: "convert",
    alias: ["conv"],
    cooldown: 1,
    description: "Commande pour convertir des golems EVE",
    usage: "*convert [nbr de golems voulu]",
    category: "Jeux",
    run: async function (client, message, args, profileData, inventoryData) {

        const valkyrie = args[0];

        if(!valkyrie) message.reply("Veuillez précisez un nombre de valkyrie a former")
        if(valkyrie > inventoryData.stone ||valkyrie > inventoryData.iron) return message.reply("**Vous n'avez pas assez de ressources pour faire cela...** *(1 fer + 1 stone = 1 valkyrie)*");
        
        const response = await inventoryModel.findOneAndUpdate({ userID: message.author.id},{ $inc: { stone: -valkyrie , iron: -valkyrie, valkyrie: valkyrie} });
        return message.reply("Conversion réussie");
    }
}