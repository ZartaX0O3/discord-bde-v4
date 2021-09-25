const {MessageEmbed} = require("discord.js");
const emote = require("../../emojis.json");

module.exports = {
    name: "create",
    alias: "",
    cooldown: 5,
    description: "Commande de start du jeux EVE",
    usage: "*create",
    category: "Jeux",
    run: async function (client, message, args) {

            let pages = [
                `__**Principe du Jeux :**__\n\nLe principe de ce jeu, basé sur minecraft, est de **farmer des ressources qui permettront d'obtenir des récompenses permettant ainsi de farmer encore plus.**\nOuais y a pas vraiment d'objectif pour l'instant vu que y a pas beaucoup de choses d'implémenter, à part un système de
                boss à affronter dans des tours pour gonfler votre ego. **Un projet de PvP est aussi en cours**, rapportant plus de ressources à prendre et protéger à l'aide de golems de pierres mais à l'heure où j'écris ces lignes il n'y a pas d'infos supplémentaires.`,
                `__**Equipements et ressources : 1/2**__\n\n**⭐ Mana :** Vous pouvez dépenser vos points de mana pour miner. Chaque point rapporte un certain nombre de ressources selon le niveau de la pioche. Le nombre de point de mana récupéré en cours du temps et la quantité maximale de mana que l'on peut avoir dépend du niveau de la Mana Bank.
                **❤️ HP :** Le nombre de point de vie dont vous disposer pour affronter les boss. Vous en récupérez un tout les 45 secondes avec une limite de 30 points.
                **⛏️ Pioche :** Son niveau représente la quantité de ressources que vous récupérez par point de mana dépensé.
                **⚔️ Epée :** son niveau indique les dégâts que vous infligez aux boss par attaque. L'améliorer est pour l'instant le seul moyen de battre un boss`,
                `__**Equipements et ressources : 1/2**__\n\n` 
            ];
            let page = 1;
        
            const embed = new MessageEmbed()
                .setAuthor(message.author.username)
                .setColor("#fc0000")
                .setTitle("👑 **Bienvenue sur EVE Online** 👑\n")
                .setFooter(`Page ${page} of ${pages.length}`)
                .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
                .setDescription(pages[page - 1])
        
            message.channel.send(embed).then(msg => {
                msg.react('◀️').then(r => {
                    msg.react('❎').then(r => {

                    msg.react('▶️');
                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀️' && user.id === message.author.id;
                    const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶️' && user.id === message.author.id;
                    const crossFilter = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
        
                    const backwards = msg.createReactionCollector(backwardsFilter, {time: 60000});
                    const forwards = msg.createReactionCollector(forwardsFilter, {time: 60000});
                    const cross = msg.createReactionCollector(crossFilter, {time: 60000});
        
                    backwards.on('collect', (r, u) => {
                        if (page === 1) {
                            r.users.remove(u.id);
                            return;
                        }
                        page--;
                        embed.setDescription(pages[page - 1]);
                        embed.setFooter(`Page ${page} of ${pages.length}`);
                        msg.edit(embed);
                        r.users.remove(u.id)
                    });
        
                    forwards.on('collect', (r, u) => {
                        if (page === pages.length) {
                            r.users.remove(u.id);
                            return
                        }
                        ;
                        page++;
                        embed.setDescription(pages[page - 1]);
                        embed.setFooter(`Page ${page} of ${pages.length}`);
                        msg.edit(embed)
                        r.users.remove(u.id)
                    });
        
                    cross.on('collect', (r, u) => {
                        msg.delete();
                    });
                })
            })
        })
    }
}
