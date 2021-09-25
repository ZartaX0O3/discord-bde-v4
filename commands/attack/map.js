const {MessageEmbed} = require("discord.js");
const channels = require("../../channels.json");
const Canvas = require('canvas');
const Discord = require('discord.js');
const MapModel = require("../../models/mapSchema");
const { ConnectionBase } = require("mongoose");

const userStreaks = new Map()

module.exports = {
    name: "map",
    alias: ["map"],
    cooldown: 1,
    description: "Commande d'affichage de la map EVE",
    usage: "*map",
    category: "Jeux",
    run: async function (client, message, args, profileData, inventoryData) {

        const canvas = Canvas.createCanvas(1000, 1000);

        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('./img/cosmos.jpg');

	    context.drawImage(background, 0, 0, canvas.width, canvas.height);
        var nombre_map =1;
        for(i=0; i<5;i++){
            for(j=0; j<5;j++){

                mapData = await MapModel.findOne({ number: nombre_map});

                var player = (message.guild.members.cache.get(mapData.owner));
                var text = '['+mapData.id+']'
                var defense = '[D] : ' + mapData.defense;

                if(!player) player = null;
                else player = player.user.username;
                context.fillStyle = mapData.color;
                context.fillRect(((i*200))+8, ((j*200))+8, 180, 180);

                context.font = 'bold 21px montserrat';
                var id1 = context.measureText(text);
	            context.fillStyle = '#000000';
                context.fillText(text, (((200-id1.width)/2)+200*i), 8+(30+200*j));

                context.font = 'bold18px montserrat';
                var id2 = context.measureText(player);
                context.fillStyle = '#000000';
                context.fillText(player, (((200-id2.width)/2)+200*i), 8+(70+200*j));

                context.font = '18px montserrat';
                var id3 = context.measureText(defense);
                context.fillStyle = '#000000';
                context.fillText(defense, (((200-id3.width)/2)+200*i), 8+(110+200*j));

                nombre_map++;
            }
        }

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        message.channel.send(attachment);
    }
}