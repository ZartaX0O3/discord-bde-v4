const inventoryModel = require("../../models/inventorySchema");
const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");

module.exports = {
    name: "nouveau",
    alias: ["nv"],
    cooldown: 5,
    description: "Création de compte EVE",
    usage: "*nouveau",
    category: "Jeux",
    run: async function (client, message, args) {

    let inventoryData;

        try {
            inventoryData = await inventoryModel.findOne({userID: message.author.id});
            console.log(inventoryData)
            if (!inventoryData) {
                let profile = await inventoryModel.create({
                    userID: message.member.id,
                    pickaxe: 0,
                    sword: 0
                })
                profile.save();
                const embed = new MessageEmbed()
                .setTitle("👑 Bienvenue sur EVE Online 👑")
                .setDescription("*Votre compte a été crée avec succès*")
                .addField(
                    { name: `**Principe du Jeux :**`, value: `Le principe de ce jeu, basé sur minecraft, est de farmer des ressources qui permettront d'obtenir des récompenses permettantde farmer
                    encore plus. Ouais y a pas vraiment d'objectif pour l'instant vu que y a pas beaucoup de choses d'implémenter, à part un système de
                    boss à affronter dans des tours pour gonfler votre ego. Le responsable a aussi un projet de zones rapportant plus de ressources à
                    prendre et protéger à l'aide de golems de pierres mais à l'heure où j'écris ces lignes (23h quand même je suis un peu con) il n'y a pas
                    d'infos supplémentaires.`},
                    { name: ``, value: ``},
                    { name: ``, value: ``},
                    { name: ``, value: ``},
                    { name: ``, value: ``},
                    { name: ``, value: ``}
                )
            }
        } catch (err) {
            console.log(err);
        }
    }
}