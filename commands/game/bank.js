const {MessageEmbed} = require("discord.js");
const inventoryModel = require("../../models/inventorySchema");
const profileModel = require("../../models/profileSchema");

module.exports = {
    name: "bank",
    alias: ["bk"],
    cooldown: 15,
    description: "Commande d'affichage de la banque EVE",
    usage: "*bank",
    category: "Jeux",
    run: async function (client, message, args, profileData, inventoryData) {

            if(args[0] == "add") {

                let money = args[1];

                if(money > profileData.coins || money == 0 ||money < 0) return message.reply("Vous n'avez pas assez de pièces ou le chiffre que vous avez donné est nul / négatif");

                if(money + inventoryData.bank > 10000) return message.reply("La quantité maximal de pièce dans la banque est de 10000");

                money = Math.floor(money);

                const response0 = await profileModel.findOneAndUpdate({ userID: message.author.id},{ $inc: { coins: -money, bank: money} });
                return message.reply(`Vous avez bien ajouté ${money} a votre banque`);
            }
        }
    }