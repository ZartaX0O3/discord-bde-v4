const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");
const channels = require("../../channels.json");
module.exports = (client,message) => {
    try{
        try{
            const stringlength = 69;
            console.log("\n")
            console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`)
            console.log(`     ┃ ` + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃")
            console.log(`     ┃ ` + `Discord Bot is online!` + " ".repeat(-1+stringlength-` ┃ `.length-`Discord Bot is online!`.length)+ "┃")
            console.log(`     ┃ ` + ` /--/ ${client.user.tag} /--/ `+ " ".repeat(-1+stringlength-` ┃ `.length-` /--/ ${client.user.tag} /--/ `.length)+ "┃")
            console.log(`     ┃ ` + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃")
            console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`)

            const embedReady = new MessageEmbed()
                .setColor("ffa600")
                .setTitle(`${emote.emojis.orange_circle} **Allumage du BOT v2**`)

            message.guild.channels.cache.get(channels.sanctionLogsChannel).send({embeds: [embedReady]})
        }catch{}

    } catch (e){
    }
}