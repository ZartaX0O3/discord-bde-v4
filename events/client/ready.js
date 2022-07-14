const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");
const channels = require("../../channels.json");

module.exports = client => {
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

        }catch{}

    } catch (e){

    }
    const embedReady = new MessageEmbed()
        .setColor("ffa600")
        .setTitle(`${emote.emojis.orange_circle} **Allumage du BOT v2**`)

    client.channels.cache.get(channels.sanctionLogsChannel).send({embeds: [embedReady]})
    client.channels.cache.get("967876642116608114").send({embeds: [embedReady]})

}