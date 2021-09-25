module.exports = {
        name: "ping",
        alias: ["pi"],
        cooldown: 0,
        description: "Commande de retour de ping",
        usage: "*ping",
        category: "Commandes utiles",
        run: function (client, message, args) {

        message.channel.send(`🏓 Votre latence est de : ${Date.now() - message.createdTimestamp}ms`);
        }
}
