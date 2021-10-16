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
}