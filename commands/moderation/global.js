const {MessageEmbed} = require("discord.js");
const channels = require("../../channels.json")

module.exports = {
    name: "global",
    category: "Moderations",
    aliases: ["glob"],
    cooldown: 10,
    usage: "global <<YEAR(S)>>",
    description: "Envoie de l'embed prédéfini dans les différents salons de classe",
    memberpermissions: [],
    requiredroles: ["891011691066851368"],
    alloweduserids: [],
    minargs: 1, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 1, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setTimestamp()
            .setColor("#ff6700")
            .setAuthor(message.member.user.username, message.member.user.displayAvatarURL())
            .setFooter("© BDE ASCII", 'https://cdn.discordapp.com/attachments/762781960224768062/872842431924699176/logo_300.png')
            .setTitle("Message automatique :")
            .addField("**Rôle de délégués**", "Bonjour à tous !\nJ'aimerais que vous me fassiez passer vos deux délégués (Titulaire et supplément) via message privé ici : .ZartaX0O3#8888")

        const channels1A = [
            channels.groupe.premier["1AG1"],
            channels.groupe.premier["1AG2"],
            channels.groupe.premier["1AG3"],
            channels.groupe.premier["1AG4"],
            channels.groupe.premier["1AG5"],
            channels.groupe.premier["1AG6"],
            channels.groupe.premier["1AG7"],
            channels.groupe.premier["1AG8"],
            channels.groupe.premier["1AG9"],
            channels.groupe.premier["1AG10"]
        ]
        const channels2A = [
            channels.groupe.deuxieme["2AG1"],
            channels.groupe.deuxieme["2AG2"],
            channels.groupe.deuxieme["2AG3"],
            channels.groupe.deuxieme["2AG4"],
            channels.groupe.deuxieme["2AG5"],
            channels.groupe.deuxieme["2AG6"],
            channels.groupe.deuxieme["2AG7"],
            channels.groupe.deuxieme["2AG8"]
        ]

        if(args[0] === "1A"){
            channels1A.forEach(element => {
                let salon = client.channels.cache.get(element);
                salon.send(embed);
            })
        }
        else if(args[0] === "2A"){
            channels2A.forEach(element => {
                let salon = client.channels.cache.get(element);
                salon.send(embed);
            })
        }
        else if(args[0] === "All"){
            channels1A.forEach(element => {
                let salon = client.channels.cache.get(element);
                salon.send(embed);
            })
            channels2A.forEach(element => {
                let salon = client.channels.cache.get(element);
                salon.send(embed);
            })
        }
    }
}
