const { Collection } = require("discord.js");
const mongoose = require("mongoose")
const Discord = require("discord.js");
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client({

    shards: "auto",
    allowedMentions: {
        parse: [ ],
        repliedUser: false,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
    ],
    presence: {
        activity: {
            name: `Moderation`,
            type: "LISTENING",
        },
        status: "online"
    }
});

module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.aliases = new Collection();

client.categories = require("fs").readdirSync(`./commands`);
//Require the Handlers                  Add the antiCrash file too, if its enabled
["events", "command", "slashCommands"]
    .filter(Boolean)
    .forEach(h => {
        require(`./handler/${h}`)(client);
    })

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log(`Connected to the DB`);
    })
    .catch((err) => {
        console.log(err);
    });

client.login(process.env.TOKEN).then(r => console.log());
