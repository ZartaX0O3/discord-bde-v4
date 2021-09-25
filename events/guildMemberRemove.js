const {MessageEmbed} = require("discord.js");
const channels = require("../channels.json");
const Canvas = require('canvas');
const Discord = require('discord.js');

module.exports = async (client, member) => {


    let welcomeChannel = client.channels.cache.get(channels.welcomeChannel);
    
    if (!welcomeChannel) return;
    
    const embed = new MessageEmbed()
        .setAuthor(member.displayName)
        .setTitle("Salut mon pote !")
        .setDescription(`Au revoir...\nA la revoyure...\nBon voyage...\n`)
        .addField("Roles", member.roles.cache.map(r => '`' + r.name + '`').join(' - '))
        .setImage('https://c.tenor.com/pb0bXGiSyu4AAAAC/salut-mon-pote-michel-drucker.gif')
        .setColor('#D71F5F')
        .setTimestamp(member.joinedTimestamp)

    welcomeChannel.send(embed);
}
