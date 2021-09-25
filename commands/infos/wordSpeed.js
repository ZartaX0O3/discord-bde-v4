const {MessageEmbed} = require("discord.js");
var randomWords = require('random-words');
const Canvas = require('canvas');
const Discord = require('discord.js');

module.exports = {
    name: "wordSpeed",
    alias: ["wp"],
    cooldown: 5,
    description: "Commande de lancement d'un test de vitese de frappe",
    usage: "*wordSpeed",
    category: "Fun",
    run: async function (client, message, args) {

        message.delete();
        var chaine1 = randomWords({exactly: 5, maxLength: 8});
        var chaine2 = randomWords({exactly: 5, maxLength: 8});
        var chaine3 = randomWords({exactly: 5, maxLength: 8});

        chaine1 = chaine1.join(' ');
        chaine2 = chaine2.join(' ');
        chaine3 = chaine3.join(' ');
        
        var chaine = chaine1 + ' ' + chaine2 + ' ' + chaine3;

        const canvas = Canvas.createCanvas(1200, 800);

        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('./img/test.png');

	    context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.font = 'bold 35pt Menlo'
        context.fillStyle = '#ffffff';
        context.fillText(chaine1, 120, 200);
        context.fillText(chaine2, 120, 400);
        context.fillText(chaine3, 120, 600);

	    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'typingTest.png');
        message.channel.send(attachment).then(msg => {

            var firstMessage = new Date();

            const filter = m => m.content === chaine && m.author.id === message.author.id;
            const collector = message.channel.createMessageCollector(filter, { time: 100000 });

            collector.on('collect', message => {

                var lastMessage = new Date();
                var res = lastMessage - firstMessage;
                var speed = 15/(res/60000);

                const embed = new MessageEmbed()
                    .setTitle("⚫  __Résultat du Test__  ⚫")
                    .addFields(
                        {name: `**Temps :**`, value:`${res/1000}sec`, inline: true},
                        {name: `**Vitesse :**`, value:`${Math.round(speed, 2)} word/min`, inline: true},
                    )

                msg.delete();
                message.channel.send(embed);
                message.delete();
            })
        })
    }
}