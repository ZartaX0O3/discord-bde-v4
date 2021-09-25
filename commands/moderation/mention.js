const roles = require("../../roles.json");

module.exports = {
    name: "mention",
    alias: ["me"],
    cooldown: 5,
    description: "Commande de ping des classes (Reservé admin)",
    usage: "*mention [année] [groupe]",
    category: "Moderation",
    run: function (client, message, args) {

        var annee, groupe;

        const group = [[1, roles.groupe.groupe_1 ],[2, roles.groupe.groupe_2 ],[3, roles.groupe.groupe_3 ],[4, roles.groupe.groupe_4 ],[5, roles.groupe.groupe_5 ],[6, roles.groupe.groupe_6 ],[7, roles.groupe.groupe_7 ],[8, roles.groupe.groupe_8 ]]
        const year = [[1, roles.extra.first_year],[2, roles.extra.second_year]]

        for (const [number, roles] of year) {
            if(args[0] == number) {
                annee = roles;
            }
        }

        for (const [number, roles] of group) {
            if(args[1] == number) {
                groupe = roles;
            }
        }

        var listes = new Array;
        message.guild.members.fetch()

        .then( members => {

            members.forEach(element => {
                if(element.roles.cache.has(annee) && element.roles.cache.has(groupe)){
                    listes += '<@' + element.user.id + '>';
                }

            });

            message.channel.send(listes);

        });

    }
}
