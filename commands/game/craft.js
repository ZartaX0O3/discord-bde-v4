const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");
const inventoryModel = require("../../models/inventorySchema");
const profileModel = require("../../models/profileSchema");
const {pickaxe} = require("./craft/pickaxe.js");
const {manaBank} = require("./craft/manaBank.js");
const {stoneGen} = require("./craft/stoneGen.js");
const {sword} = require("./craft/sword.js");

module.exports = {
    name: "craft",
    alias: ["cr"],
    cooldown: 30,
    description: "Commande de craft EVE",
    usage: "*craft [objt a craft]",
    category: "Jeux",
    run: async function (client, message, args, profileData, inventoryData) {

        if(!inventoryData) return message.reply("Vous  devez d'abord vous créer un profil avec *nouveau");

        const outils = args[0];

        if(outils === "pioche" || outils === "pi") {
            pickaxe(message, inventoryData);
        }

        else if(outils === "manaBank" || outils === "mb") {
            manaBank(message, inventoryData);
        }

        else if(outils === "stoneGenerator" || outils === "sg") {
            stoneGen(message, inventoryData);
        }

        else if(outils === "sword" || outils === "sw") {
            sword(message, inventoryData);
        }
    }
}