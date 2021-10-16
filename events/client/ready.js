module.exports = client => {
    //SETTING ALL GUILD DATA FOR THE DJ ONLY COMMANDS for the DEFAULT
    //client.guilds.cache.forEach(guild=>client.settings.set(guild.id, ["autoplay", "clearqueue", "forward", "loop", "jump", "loopqueue", "loopsong", "move", "pause", "resume", "removetrack", "removedupe", "restart", "rewind", "seek", "shuffle", "skip", "stop", "volume"], "djonlycmds"))
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
}