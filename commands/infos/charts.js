const {MessageEmbed} = require("discord.js");
const QuickChart = require('quickchart-js');

module.exports = {
    name: "game-chart",
    category: "Information",
    aliases: ["chart","charts"],
    cooldown: 2,
    usage: "game-chart",
    description: "Voir les statistiques des joueurs du serveur",
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args) => {

        const chart = new QuickChart();
        chart.setConfig({
                type: 'pie',
                data: { labels: ['Hello world', 'Foo bar'], datasets: [{ label: 'Foo', data: [1, 2] }] },
            })
            .setWidth(800)
            .setHeight(400);

        chart.setBackgroundColor('transparent');
        message.channel.send(chart.getUrl());
    }
}