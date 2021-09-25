const profileModel = require("../../models/profileSchema");
const inventoryModel = require("../../models/inventorySchema");

module.exports = {
    name: "daily",
    alias: ["daily","dl"],
    cooldown: 86400,
    description: "Commande de récupération de point journalière EVE",
    usage: "*daily",
    category: "Jeux",
    run: async function (client, message, args) {

        const daily = Math.floor(Math.random() * 600) + 1;
        const gainMana = Math.floor(Math.random() * 30) + 1;

        const response1 = await profileModel.findOneAndUpdate(
            {
                userID: message.author.id,
            },
            {
                $inc: {
                    coins: daily,
                }
            }
        );

        const response2 = await inventoryModel.findOneAndUpdate(
            {
                userID: message.author.id,
            },
            {
                $inc: {
                    mana: gainMana,
                }
            }
        );

        return message.channel.send(`🕰️ ${message.author.username} a reçu son daily contenant ${daily} coins 💰 et ${gainMana} de mana ⭐!`);

    }
}