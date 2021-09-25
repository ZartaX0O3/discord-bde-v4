
module.exports = {
    name: "remind",
    alias: ["re","rappel"],
    cooldown: 5,
    description: "Commande de rappel d'événements",
    usage: "*remind [temps en seconde] [rappel]",
    category: "Commandes utiles",
    run: async function (client, message, args) {

        const temps = args[0];
        
        if(!temps) return message.reply("Un temps est nécessaire");

        args.shift();
        const remind = args.join(" ");

        message.delete();
        message.reply("Rappel prit en compte")
        setTimeout(function () {
            message.reply("Rappel toi ! " + remind)
        }, temps* 1000);
    }
}
