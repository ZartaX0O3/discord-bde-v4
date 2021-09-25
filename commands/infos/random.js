const {MessageEmbed, MessageReaction} = require("discord.js");

module.exports = {
    name: "random",
    alias: ["rd","r"],
    cooldown: 5,
    description: "Commande d'envoie d'un nombre aléatoire",
    usage: "*random ou *random [ton nombre]",
    category: "Fun",
    run: function (client, message, args) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    if (!args[0]) {
        const nombre = getRandomInt("0", "100");

        const embed = new MessageEmbed()
            .setColor("#000000")
            .addFields(
                {name: `Nombre aléatoire `, value: `${nombre}`},
            )
        message.channel.send(embed);
        message.delete();
    } else {
        const reponse = parseInt(args[0]);
        console.log(reponse);
        if (Number.isInteger(reponse)) {
            if (reponse < 0 || reponse > 100) return message.reply("Le nombre doit être compris entre 0 et 100 !")

            const nombre = getRandomInt("0", "100");
            const embed = new MessageEmbed()
                .setColor("#000000")
                .addFields(
                    {name: `Votre nombre : `, value: `${reponse}`},
                    {name: `Nombre du BOT : `, value: `${nombre}`},
                )
            message.channel.send(embed);
            if (nombre === reponse) {
                message.reply("Bravo ^^");
            } else {
                message.reply("Dommage nous n'avons pas le même nombre...");
            }
            message.delete();
        } else {
            message.reply("Nombre entier c'est mieux ^^")
        }
    }
}
}
