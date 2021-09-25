const profileModel = require("../../models/profileSchema");

const userStreaks = new Map()

module.exports = {
    name: "hourly",
    alias: ["hr"],
    cooldown: 3600,
    description: "Commande de récupération de récupération de point EVE",
    usage: "*hourly",
    category: "Jeux",
    run: async function (client, message, args) {

        const {author, channel} = message

        let coins = Math.floor(Math.random() * 80) + 1;
        let coinsBonus = 0;
        let userStreak;

        if (!userStreaks.has(author.id)) {

            userStreak = {streak: 0, timestamp: Date.now()}
            userStreaks.set(author.id, userStreak)

        } else {

            userStreak = userStreaks.get(author.id)
            const lapsedTimeInS = (Date.now() - userStreak.timestamp) / 1000;

            if (lapsedTimeInS >= 3600 && lapsedTimeInS <= 5400) {
                userStreak = {streak: userStreak.streak + 1, timestamp: Date.now()}
                userStreaks.set(author.id, userStreak)
                coinsBonus = userStreak.streak * Math.floor(Math.random() * 10) + 1;
                coins = coins + coinsBonus;

            } else {

                userStreaks.delete(author.id,userStreak);
                userStreak = {streak: 0, timestamp: Date.now()}

            }
        }

        const response = await profileModel.findOneAndUpdate(
            {
                userID: message.author.id,
            },
            {
                $inc: {
                    coins: coins,
                }
            }
        );

        return message.channel.send(`${message.author.username} a reçu son hourly contenant ${coins} coins ${userStreak.streak > 0 ? `dont ${coinsBonus} coins bonus !` : ""} [Combo = ${userStreak.streak}]`);

    }
}