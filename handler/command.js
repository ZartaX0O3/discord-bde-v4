const { readdirSync } = require("fs");

console.log("Welcome to SERVICE HANDLER /--/ Discord: ZartaX0O3#8888");
module.exports = (client) => {
    try{
        readdirSync("./commands/").forEach((dir) => {
            const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
            for (let file of commands) {
                let pull = require(`../commands/${dir}/${file}`);
                if (pull.name) {
                    let promise = client.commands.set(pull.name, pull);
                } else {
                    continue;
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
            }
        });
    }catch (e){
        console.log(String(e.stack))
    }
};
