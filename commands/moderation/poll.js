const emojis = require("../../emojis.json");
const pollModel = require("../../models/pollSchema");
const {MessageEmbed} = require("discord.js");
const { MessageButton } = require("discord-buttons");


module.exports = {
    name: "poll",
    alias: ["po"],
    cooldown: 5,
    description: "Commande de sondage (Reservé admin)",
    usage: "*poll [id]|[Bouton_1]|[Bouton_2]|[ID_Bouton_1]|[ID_Bouton_2]|[Question]",
    category: "Moderation",
    run: async function (client, message, args) {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**Permission Admin nécessaire**")

    let arguments = args.join(" ");
    var arrayOfStrings = arguments.split("|");

    let ID = arrayOfStrings[0];
    let option1 = arrayOfStrings[1];
    let option2 = arrayOfStrings[2];
    let idOption1 = arrayOfStrings[3];
    let idOption2 = arrayOfStrings[4];
    let vote = arrayOfStrings[5];
    let color = arrayOfStrings[6];
    let liste = [];

    try {
        pollProfile = await pollModel.findOne({id: ID});
        if (!pollProfile) {
            let profile = await pollModel.create({
                id: ID,
                response_1: option1,
                response_2: option2,
                option_1: 0,
                option_2: 0,
                id_option_1: idOption1,
                id_option_2: idOption2,
                listeVoteurs: liste,
                author: message.author.username,
                question: vote,
            })
            profile.save();
            pollProfile = await pollModel.findOne({id: ID});
        }
    } catch (err) {
        console.log(err);
    }

    const embed = new MessageEmbed()
        .setColor("#ed7024")
        .setTitle(`🟠  __Sondage__  🟠`)
        .setDescription(pollProfile.question)
        .addFields(
            {name: `**${pollProfile.response_1} :**`, value:`${pollProfile.option_1}`, inline: true},
            {name: `**${pollProfile.response_2} :**`, value:`${pollProfile.option_2}`, inline: true},
            {name: `**Par**`, value: `${pollProfile.author}`}
        )

    const yes = new MessageButton()
        .setStyle("green")
        .setLabel(`${option1}`)
        .setID(idOption1+'_'+ID)

    const no = new MessageButton()
        .setStyle("red")
        .setLabel(`${option2}`)
        .setID(idOption2+'_'+ID)

    message.channel.send({
        buttons: [yes, no],
        embed: embed
    })

    message.delete();
    }
}
