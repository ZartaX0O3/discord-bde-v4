const {MessageEmbed} = require("discord.js");
const profileModel = require("../models/profileSchema");
const channels = require("../channels.json");
const Canvas = require('canvas');
const Discord = require('discord.js');

module.exports = async (client, member) => {

  let welcomeChannel = client.channels.cache.get(channels.welcomeChannel);
    
  const embed = new MessageEmbed()
    .setAuthor(member.displayName)
    .setTitle("Bienvenue sur le Serveur de l'IUT informatique d'Aubière")
    .setDescription(`**Soit le bienvenue ${member.displayName} !**\n\n• Merci de bien vouloir lire les règles <#748981441437761666>\n•  Pour avoir ton rôle vas dans <#873596404977795072> (puis <#873596888195153940> si tu es un élève)\n• Merci de bien vouloir indiquer ton nom ou prénom dans ton pseudo discord ( toute personne inconnue au bataillon ne se verra pas accorder de rôle)`)
    .setColor('#0080FF')
    .setTimestamp(member.joinedTimestamp)

  welcomeChannel.send(embed);

  profileData = await profileModel.findOne({userID: member.id});
  if (!profileData) {
    let profile = await profileModel.create({
      userID: member.id,
      serverID: member.guild.id,
      coins: 1000,
      bank: 0
    });

    profile.save();
  }
}