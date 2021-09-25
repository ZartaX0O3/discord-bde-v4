const {MessageEmbed} = require("discord.js");
const channels = require("../../channels.json");
const emote = require("../../emojis.json");
const roles = require("../../roles.json");
const Canvas = require('canvas');
const Discord = require('discord.js');

module.exports = {
    name: "lune",
    alias: ["<:fusee:833064341619867770>", "ObjLune"],
    cooldown: 5,
    description: "Commande d'allunissage (Reservé admin)",
    usage: "*lune [id] [temps]",
    category: "Moderation",
    run: async function (client, message, args) {

    var msgInfo = "";

    var member = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])

    //si le membre est inconnu
    if (member == undefined) return message.channel.send("erreurID => ID inconnu");
    
    //si le membre est déjà en cooldown
    if(member.roles.cache.has(roles.extra.cooldown)) return message.channel.send("erreurMembre => Le membre est déjà averti");

    //test si avert une personne supérieure 
    if(!message.member.permissions.has("BAN_MEMBERS")) {
        member = message.member.id;
    }

    var tempsCoolDown = args[1];
    if(!args[1]) tempsCoolDown = 120;
;
    if (Number.isInteger(tempsCoolDown)){
        if (tempsCoolDown < 0)return message.channel.send("erreurTime => la durée doit être supérieure ou égale à 0 min (une minute de base)");
    }

    
    attachement = drawArthur(message, member);
    msgInfo = "**Allo, allo, ici fusée lunaire... C'est Tintin qui vous parle... Je viens de reprendre connaissance... Je vais voir comment se portent mes compagnons...**"
    msgInfo += `${message.author} a sanctionné ${member.user.username} (${member.user.discriminator})\nOn le reverra dans ${tempsCoolDown} s`;

    member.roles.add(roles.extra.cooldown);
    message.channel.send(msgInfo);

    const embed = new MessageEmbed()
        .setColor("#ff5e3a")
        .setTitle(`**Fusée Lunaire**`)
        .addFields(
            {name: "Membre : ", value: `${member.user.tag}`},
            {name: " ID Salon : ", value: message.channel.id},
            {name: "Par :", value: message.author}
        )

    message.guild.channels.cache.get(channels.sanctionLogsChannel).send(embed)
    member.roles.add(roles.extra.cooldown)
    setTimeout(function () {
            member.roles.remove(roles.extra.cooldown);
        }, tempsCoolDown * 1000);
    }
}

async function drawArthur(message, member){

    const canvas = Canvas.createCanvas(780, 1040);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./img/fusee.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const tailleImage = 100;
    const x = 418;
    const y = 290;

    //ctx.font = '40px sans-serif';
    //ctx.fillStyle = `#ffffff`;
    //var text = ctx.measureText(member.user.username);
    
    //ctx.fillText(member.user.username, x-text.width/2, y+tailleImage);

    // Pick up the pen
    ctx.beginPath();
    // Start the arc to form a circle
    ctx.arc(x, y, tailleImage/2, 0, Math.PI * 2, true);
    // Put the pen down
    ctx.closePath();
    // Clip off the region you drew on
    ctx.clip();
        
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: 'png' }));
    ctx.drawImage(avatar, x-tailleImage/2, y-tailleImage/2, tailleImage, tailleImage);
    
    const attachement = new Discord.MessageAttachment(canvas.toBuffer(), './fusee.png');

    message.channel.send(attachement);
            
}