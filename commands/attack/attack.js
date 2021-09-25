const {MessageEmbed} = require("discord.js");
const MapModel = require("../../models/mapSchema");
const inventoryModel = require("../../models/inventorySchema");
const map = require("./map");

const userStreaks = new Map()

module.exports = {
    name: "attaque",
    alias: ["atk"],
    cooldown: 1,
    description: "Commande d'attaque EVE",
    usage: "*attaque [ville] [nombre de golems]",
    category: "Jeux",
    run: async function (client, message, args, profileData, inventoryData) {

        if(args[0] == "maps") {
            const embed = new MessageEmbed()
                .setTitle(`**----- Maps disponibles -----**`)
                .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                .setDescription("\`\`\` WWNN, WWN, WW, WWS, WWSS, WNN, WN, W, WS, WSS, NN, N, C, S, SS, ENN, EN, E, ES, ESS, EENN, EEN, EE, EES, EESS \`\`\`")
            
            return message.channel.send(embed);
        }

        var nbMap=0;

        for(i=1; i<26; i++) {
            city = await MapModel.findOne({ number: i});
            if(city.owner == message.member.user.id) nbMap++;
        }

        if(nbMap >= 2) return message.reply("Vous avez atteint le maximum de villes possibles");

        var map = await MapModel.findOne({id: args[0]});
        var attaque = args[1];
        var reste = inventoryData.valkyrie - attaque;

        if(!map) return message.reply("**Map invalide (liste des maps avec \*attaque maps)**");
        if(attaque > inventoryData.valkyrie) return message.reply("Vous n'avez pas assez de golems pour attaquer !")

        if(attaque > map.defense) {

            nouvelleDéfense = attaque - map.defense
            const response1 = await MapModel.findOneAndUpdate({ id: map.id },{ $set: { defense: nouvelleDéfense, owner: message.member.user.id}});
            const response2 = await inventoryModel.findOneAndUpdate({ userID: message.member.user.id}, { $set: { valkyrie: reste}})
            return message.reply(`Attaque sur la map ${map.id} réussi, vous êtes maintenant gouverneur de la ville.`);

        }
        else{

            nouvelleDéfense = map.defense - attaque
            const response = await MapModel.findOneAndUpdate({ id: map.id },{ $set: { defense: nouvelleDéfense}});
            return message.reply(`Attaque sur la map ${map.id} raté, vous ne récupérez pas la ville...`);

        }
    } 
}