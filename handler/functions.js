const {Collection} = require("discord.js");
const settings = require("../botconfig/settings.json");

//EXPORT ALL FUNCTIONS
module.exports.onCoolDown = onCoolDown;
module.exports.escapeRegex = escapeRegex;
module.exports.replacemsg = replacedefaultmessages;
module.exports.GetUser = GetUser;

function replacedefaultmessages(text, o = {}){
    if(!text) throw "No Text for the replacedefault message added as First Parameter";
    const options = Object(o)
    if(!options) return String(text)
    return String(text)
        .replace(/%{timeleft}%/gi, options && options.timeLeft ? options.timeLeft.toFixed(1) : "%{timeleft}%")
        .replace(/%{commandname}%/gi, options && options.command && options.command.name ? options.command.name : "%{commandname}%")
        .replace(/%{commandaliases}%/gi, options && options.command && options.command.aliases ? options.command.aliases.map(v => `\`${v}\``).join(",") : "%{commandaliases}%")
        .replace(/%{prefix}%/gi, options && options.prefix ? options.prefix : "%{prefix}%")
        .replace(/%{commandmemberpermissions}%/gi, options && options.command && options.command.memberpermissions ? options.command.memberpermissions.map(v => `\`${v}\``).join(",") : "%{commandmemberpermissions}%")
        .replace(/%{commandalloweduserids}%/gi, options && options.command &&options.command.alloweduserids ? options.command.alloweduserids.map(v => `<@${v}>`).join(",") : "%{commandalloweduserids}%")
        .replace(/%{commandrequiredroles}%/gi, options && options.command &&options.command.requiredroles ? options.command.requiredroles.map(v => `<@&${v}>`).join(",") : "%{commandrequiredroles}%")
        .replace(/%{errormessage}%/gi, options && options.error && options.error.message ? options.error.message : options && options.error ? options.error : "%{errormessage}%")
        .replace(/%{errorstack}%/gi, options && options.error && options.error.stack ? options.error.stack : options && options.error && options.error.message ? options.error.message : options && options.error ? options.error : "%{errorstack}%")
        .replace(/%{error}%/gi, options && options.error ? options.error : "%{error}%")

}
/**
 *
 * @param {*} message A DiscordMessage, with the client, information
 * @param {*} command The Command with the command.name
 * @returns number
 */

function onCoolDown(message, command) {
    if(!message || !message.client) throw "No Message with a valid DiscordClient granted as First Parameter";
    if(!command || !command.name) throw "No Command with a valid Name granted as Second Parameter";
    const client = message.client;
    if (!client.cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
        client.cooldowns.set(command.name, new Collection());
    }
    const now = Date.now(); //get the current time
    const timestamps = client.cooldowns.get(command.name); //get the timestamp of the last used commands
    const cooldownAmount = (command.cooldown || settings.default_cooldown_in_sec) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
    if (timestamps.has(message.member.id)) { //if the user is on cooldown
        const expirationTime = timestamps.get(message.member.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
        if (now < expirationTime) { //if he is still on cooldonw
             //get the lefttime
            //return true
            return (expirationTime - now) / 1000
        }
        else {
            //if he is not on cooldown, set it to the cooldown
            timestamps.set(message.member.id, now);
            //set a timeout function with the cooldown, so it gets deleted later on again
            setTimeout(() => timestamps.delete(message.member.id), cooldownAmount);
            //return false aka not on cooldown
            return false;
        }
    }
    else {
        //if he is not on cooldown, set it to the cooldown
        timestamps.set(message.member.id, now);
        //set a timeout function with the cooldown, so it gets deleted later on again
        setTimeout(() => timestamps.delete(message.member.id), cooldownAmount);
        //return false aka not on cooldown
        return false;
    }
}

function escapeRegex(str) {
    try {
        return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    } catch (e) {
        console.log(String(e.stack))
    }
}

/**
 *
 * @param {*} message a DISCORDMESSAGE with the Content and guild and client information
 * @param {*} arg //a argument, for search for example
 * @returns BOOLEAN/DISCORDUSER
 */
function GetUser(message, arg){
    const errormessage = ":x: J'ai échoué à trouver l'utilisateur...";
    return new Promise(async (resolve, reject) => {
        let args = arg, client = message.client;
        if(!client || !message) return reject("CLIENT IS NOT DEFINED")
        if(!args) args = message.content.trim().split(/ +/).slice(1);
        let user = message.mentions.users.first();
        if(!user && args[0] && args[0].length === 18) {
            user = await client.users.fetch(args[0])
            if(!user) return reject(errormessage)
            return resolve(user);
        }
        else if(!user && args[0]){
            let alluser = message.guild.members.cache.map(member=> String(member.user.tag).toLowerCase())
            user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
            user = message.guild.members.cache.find(me => String(me.user.tag).toLowerCase() === user)
            if(!user || !user.id) {
                alluser = message.guild.members.cache.map(member => String(member.displayName + "#" + member.user.discriminator).toLowerCase())
                user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
                user = message.guild.members.cache.find(me => String(me.displayName + "#" + me.user.discriminator).toLowerCase() === user)
                if(!user || !user.id) return reject(errormessage)
            }
            user = await client.users.fetch(user.id)
            if(!user) return reject(errormessage)
            return resolve(user);
        }
        else {
            user = message.mentions.users.first() || message.author;
            return resolve(user);
        }
    })
}

/**
 *
 * @param {*} message a DISCORDMESSAGE with the Content and guild and client information
 * @param {*} arg //a argument, for search for example
 * @returns BOOLEAN/DISCORDUSER
 */
function GetGlobalUser(message, arg){
    let errormessage = ":x: I failed finding that User...";
    return new Promise(async (resolve, reject) => {
        let args = arg, client = message.client;
        if(!client || !message) return reject("CLIENT IS NOT DEFINED")
        if(!args) args = message.content.trim().split(/ +/).slice(1);
        let user = message.mentions.users.first();
        if(!user && args[0] && args[0].length === 18) {
            user = await client.users.fetch(args[0])
            if(!user) return reject(errormessage)
            return resolve(user);
        }
        else if(!user && args[0]){
            let alluser = [], allmembers = [];
            var guilds = Array.from(client.guilds.cache.values())
            for(const g of guilds){
                var members = Array.from(g.members.cache.values());
                for(const m of members) { alluser.push(m.user.tag); allmembers.push(m); }
            }
            user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
            user = allmembers.find(me => String(me.user.tag).toLowerCase() === user)
            if(!user || !user.id) {
                user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
                user = allmembers.find(me => String(me.displayName + "#" + me.user.discriminator).toLowerCase() === user)
                if(!user || !user.id) return reject(errormessage)
            }
            user = await client.users.fetch(user.id)
            if(!user) return reject(errormessage)
            return resolve(user);
        }
        else {
            user = message.mentions.users.first() || message.author;
            return resolve(user);
        }
    })
}