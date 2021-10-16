const fs = require("fs");
const allevents = [];
module.exports = async (client) => {
    try {
        try {
            const stringlength = 69;
            console.log("\n")
            console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`)
            console.log(`     ┃ ` + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃")
            console.log(`     ┃ ` + `Welcome to SERVICE HANDLER!` + " ".repeat(-1 + stringlength - ` ┃ `.length - `Welcome to SERVICE HANDLER!`.length) + "┃")
            console.log(`     ┃ ` + `By discord.gg/ascii /-/` + " ".repeat(-1 + stringlength - ` ┃ `.length - `By discord.gg/ascii /-/`.length) + "┃")
            console.log(`     ┃ ` + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃")
            console.log(`     ┃ ` + `Discord: ZartaX0O3#8888 /-/` + " ".repeat(-1 + stringlength - ` ┃ `.length - `   Discord: ZartaX0O3#8888 /-/`.length) + "   ┃")
            console.log(`     ┃ ` + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃")
            console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`)
        } catch {}
        let amount = 0;
        const load_dir = (dir) => {
            const event_files = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith(".js"));
            for (const file of event_files) {
                try {
                    const event = require(`../events/${dir}/${file}`)
                    let eventName = file.split(".")[0];
                    allevents.push(eventName);
                    client.on(eventName, event.bind(null, client));
                    amount++;
                } catch (e) {
                    console.log(e)
                }
            }
        }
        await ["client", "guild"].forEach(e => load_dir(e));
        console.log(`${amount} Events Loaded`);
        try {
            const stringlength2 = 69;
            console.log("\n")
            console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`)
            console.log(`     ┃ ` + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃")
            console.log(`     ┃ ` + `Logging into the BOT...` + " ".repeat(-1 + stringlength2 - ` ┃ `.length - `Logging into the BOT...`.length) + "┃")
            console.log(`     ┃ ` + " ".repeat(-1 + stringlength2 - ` ┃ `.length) + "┃")
            console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`)
        } catch {}
    } catch (e) {}
};