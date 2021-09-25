const { MessageButton } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const poll = require("./commands/moderation/poll");
const inventoryModel = require("./models/inventorySchema");
const profileModel = require("./models/profileSchema");
const pollModel = require("./models/pollSchema");
const channels = require("./channels.json")

const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION", "USER", "GUILD_MEMBER", "BUTTON"]});

require("dotenv").config();
require('discord-buttons')(client)

client.config = {
    prefix: "*"
}

client.on('clickButton', async (button) => {

    var bouton = button.id
    var arrayString = bouton.split('_');

    var choixJoueur = arrayString[0];
    var poll_id = arrayString[1];
    var poll = await pollModel.findOne({id: poll_id});

    var liste = poll.listeVoteurs;
    var choix = poll.choixVoteurs;
    
    if(choixJoueur === poll.id_option_1) {

        if (liste.includes(button.clicker.user.id) == false) {  

            choix.push(poll.response_1);
            liste.push(button.clicker.user.id);

            await pollModel.updateOne({id: poll.id}, {$inc : {option_1 : 1}, $set : {listeVoteurs : liste, choixVoteurs : choix}});

        }
        else {
            var index = liste.indexOf(button.clicker.user.id);

            if(choix[index] == poll.response_2) {
                choix[index] = poll.response_1;
                await pollModel.updateOne({id: poll.id}, {$inc : {option_1 : 1, option_2 : -1}, $set : {listeVoteurs : liste, choixVoteurs : choix}});
            }

        }
    }

    if(choixJoueur == poll.id_option_2) {

        if (liste.includes(button.clicker.user.id) == false) {

            choix.push(poll.response_2);
            liste.push(button.clicker.user.id);

            await pollModel.updateOne({id: poll.id}, {$inc : {option_2 : 1}, $set : {listeVoteurs : liste, choixVoteurs : choix}});

        }
        else{

            var index = liste.indexOf(button.clicker.user.id);

            if(choix[index] == poll.response_1) {
                choix[index] = poll.response_2;
                await pollModel.updateOne({id: poll.id}, {$inc : {option_1 : -1, option_2 : 1}, $set : {listeVoteurs : liste, choixVoteurs : choix}});
            }

        }

    }

    var poll = await pollModel.findOne({id: poll_id});

    const embed = new MessageEmbed()
        .setColor("#ed7024")
        .setTitle(`🟠  __Sondage__  🟠`)
        .setDescription(poll.question)
        .addFields(
            {name: `**${poll.response_1} :**`, value:`${poll.option_1}`, inline: true},
            {name: `**${poll.response_2} :**`, value:`${poll.option_2}`, inline: true},
            {name: `**Par**`, value: `${poll.author}`}
        )

    button.message.edit(embed);

    button.defer();
})

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

for (const folder of fs.readdirSync("./commands/")) {

    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"))
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`)
        client.commands.set(command.name, command)
    }

}

mongoose.connect("mongodb+srv://ZartaX0O3:Panda567&@cluster0.77kiy.mongodb.net/DiscordBot?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => {
        console.log(`Connected to the DB`);
    })
    .catch((err) => {
        console.log(err);
    });


client.on('ready', () => {
    client.user.setActivity("la commande *help", {
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      });
});

client.login(process.env.TOKEN);


// Game manaAdd function :

const manaAdd1 = async () => await inventoryModel.updateMany({ manaBank: 0, mana : {$lt : 100}}, {$inc : {mana : 1}})
setInterval(manaAdd1, 45000);
const manaAdd2 = async () => await inventoryModel.updateMany({ manaBank: 1, mana : {$lt : 150}}, {$inc : {mana : 1}})
setInterval(manaAdd2, 40000);
const manaAdd3 = async () => await inventoryModel.updateMany({ manaBank: 2, mana : {$lt : 200}}, {$inc : {mana : 1}})
setInterval(manaAdd3, 38000);
const manaAdd4 = async () => await inventoryModel.updateMany({ manaBank: 3, mana : {$lt : 250}}, {$inc : {mana : 1}})
setInterval(manaAdd4, 35000);
const manaAdd5 = async () => await inventoryModel.updateMany({ manaBank: 4, mana : {$lt : 400}}, {$inc : {mana : 1}})
setInterval(manaAdd5, 32000);
const manaAdd6 = async () => await inventoryModel.updateMany({ manaBank: 5, mana : {$lt : 500}}, {$inc : {mana : 1}})
setInterval(manaAdd6, 30000);
const manaAdd7 = async () => await inventoryModel.updateMany({ manaBank: 6, mana : {$lt : 600}}, {$inc : {mana : 1}})
setInterval(manaAdd7, 28000);
const manaAdd8 = async () => await inventoryModel.updateMany({ manaBank: 7, mana : {$lt : 750}}, {$inc : {mana : 1}})
setInterval(manaAdd8, 25000);
const manaAdd9 = async () => await inventoryModel.updateMany({ manaBank: 8, mana : {$lt : 900}}, {$inc : {mana : 1}})
setInterval(manaAdd9, 23000);
const manaAdd10 = async () => await inventoryModel.updateMany({ manaBank: 9, mana : {$lt : 1000}}, {$inc : {mana : 1}})
setInterval(manaAdd10, 20000);
const manaAdd11 = async () => await inventoryModel.updateMany({ manaBank: 10, mana : {$lt : 1100}}, {$inc : {mana : 1}})
setInterval(manaAdd11, 20000);

// Game StoneGenerator function :

const stoneGen1 = async () => await inventoryModel.updateMany({ stoneGenerator: 1, stone : {$lt : 1000000}}, {$inc : {stone : 75}})
setInterval(stoneGen1, 30000);
const stoneGen2 = async () => await inventoryModel.updateMany({ stoneGenerator: 2, stone : {$lt : 1500000}}, {$inc : {stone : 100}})
setInterval(stoneGen2, 25000)
const stoneGen3 = async () => await inventoryModel.updateMany({ stoneGenerator: 3, stone : {$lt : 3000000}}, {$inc : {stone : 300}})
setInterval(stoneGen3, 20000);
const stoneGen4 = async () => await inventoryModel.updateMany({ stoneGenerator: 4, stone : {$lt : 5000000}}, {$inc : {stone : 500}})
setInterval(stoneGen4, 15000);
const stoneGen5 = async () => await inventoryModel.updateMany({ stoneGenerator: 5, stone : {$lt : 10000000}}, {$inc : {stone : 750}})
setInterval(stoneGen5, 15000);
const stoneGen6 = async () => await inventoryModel.updateMany({ stoneGenerator: 6, stone : {$lt : 15000000}}, {$inc : {stone : 1000}})
setInterval(stoneGen6, 15000);
const stoneGen7 = async () => await inventoryModel.updateMany({ stoneGenerator: 7, stone : {$lt : 20000000}}, {$inc : {stone : 1500}})
setInterval(stoneGen7, 15000);
const stoneGen8 = async () => await inventoryModel.updateMany({ stoneGenerator: 8, stone : {$lt : 40000000}}, {$inc : {stone : 2000}})
setInterval(stoneGen8, 15000);
const stoneGen9 = async () => await inventoryModel.updateMany({ stoneGenerator: 9, stone : {$lt : 80000000}}, {$inc : {stone : 2500}})
setInterval(stoneGen9, 15000);
const stoneGen10 = async () => await inventoryModel.updateMany({ stoneGenerator: 10, stone : {$lt : 100000000}}, {$inc : {stone : 4000}})
setInterval(stoneGen10, 15000);

// Game HP regeneration function :

const HP1 = async () => await inventoryModel.updateMany({ chestplate: 0,  hp :{$lt : 30}}, {$inc : {hp : 1}})
setInterval(HP1, 45000);
const HP2 = async () => await inventoryModel.updateMany({ chestplate: 1,  hp :{$lt : 35}}, {$inc : {hp : 1}})
setInterval(HP2, 44000);
const HP3 = async () => await inventoryModel.updateMany({ chestplate: 2,  hp :{$lt : 50}}, {$inc : {hp : 1}})
setInterval(HP3, 43000);
const HP4 = async () => await inventoryModel.updateMany({ chestplate: 3,  hp :{$lt : 75}}, {$inc : {hp : 1}})
setInterval(HP4, 42000);
const HP5 = async () => await inventoryModel.updateMany({ chestplate: 4,  hp :{$lt : 100}}, {$inc : {hp : 1}})
setInterval(HP5, 41000);
const HP6 = async () => await inventoryModel.updateMany({ chestplate: 5,  hp :{$lt : 150}}, {$inc : {hp : 1}})
setInterval(HP6, 40000);
const HP7 = async () => await inventoryModel.updateMany({ chestplate: 6,  hp :{$lt : 175}}, {$inc : {hp : 1}})
setInterval(HP7, 38000);
const HP8 = async () => await inventoryModel.updateMany({ chestplate: 7,  hp :{$lt : 200}}, {$inc : {hp : 1}})
setInterval(HP8, 36000);
const HP9 = async () => await inventoryModel.updateMany({ chestplate: 8,  hp :{$lt : 250}}, {$inc : {hp : 1}})
setInterval(HP9, 34000);
const HP10 = async () => await inventoryModel.updateMany({ chestplate: 9,  hp :{$lt : 300}}, {$inc : {hp : 1}})
setInterval(HP10, 32000);
const HP11 = async () => await inventoryModel.updateMany({ chestplate: 10,  hp :{$lt : 500}}, {$inc : {hp : 1}})
setInterval(HP11, 30000);

// Game Attack settings function : 

const Attack1 = async () => await inventoryModel.updateMany({ sword: 0}, {$set : {attack : 1}})
setInterval(Attack1, 1000);
const Attack2 = async () => await inventoryModel.updateMany({ sword: 1}, {$set : {attack : 3}})
setInterval(Attack2, 1000)
const Attack3 = async () => await inventoryModel.updateMany({ sword: 2}, {$set : {attack : 5}})
setInterval(Attack3, 1000);
const Attack4 = async () => await inventoryModel.updateMany({ sword: 3}, {$set : {attack : 10}})
setInterval(Attack4, 1000);
const Attack5 = async () => await inventoryModel.updateMany({ sword: 4}, {$set : {attack : 12}})
setInterval(Attack5, 1000);
const Attack6 = async () => await inventoryModel.updateMany({ sword: 5}, {$set : {attack : 15}})
setInterval(Attack6, 1000);
const Attack7 = async () => await inventoryModel.updateMany({ sword: 6}, {$set : {attack : 20}})
setInterval(Attack7, 1000)
const Attack8 = async () => await inventoryModel.updateMany({ sword: 7}, {$set : {attack : 25}})
setInterval(Attack8, 1000);
const Attack9 = async () => await inventoryModel.updateMany({ sword: 8}, {$set : {attack : 30}})
setInterval(Attack9, 1000);
const Attack10 = async () => await inventoryModel.updateMany({ sword: 9}, {$set : {attack : 40}})
setInterval(Attack10, 1000);
const Attack11 = async () => await inventoryModel.updateMany({ sword: 10}, {$set : {attack : 50}})
setInterval(Attack11, 1000);

// Game void energy fonction :

const Energy = async () => await inventoryModel.updateMany({ void_energy : {$lt : 20}}, {$inc : {void_energy : 1}})
setInterval(Attack11, 3600000);

// Game Bank function :

const banque = async () => {
    for (const acc of (await profileModel.find())) {
        acc.coins += Math.floor(0.01 * acc.bank);
        acc.save()
    }
} 
setInterval(banque, 7200000);