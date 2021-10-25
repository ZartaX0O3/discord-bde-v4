const pollModel = require("../../models/pollSchema");
const fs = require('fs');

module.exports = {
    name: "whoVote",
    category: "Moderation",
    aliases: ["who"],
    cooldown: 10,
    usage: "whoVote <<poll_id>>",
    description: "Affichage des votants au sondage",
    memberpermissions: ["ADMINISTRATOR"],
    requiredroles: [],
    alloweduserids: [],
    minargs: 1, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 1, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args) => {


        let poll_id = args[0];
        let pollProfile = await pollModel.findOne({id: poll_id});

        let liste = pollProfile.listeVoteurs;
        let choix = pollProfile.choixVoteurs;
        
        let messageRes = "";

        liste.forEach((element, index) => {
            if(choix[index] === pollProfile.response_1){

                const User = client.users.cache.get(element);
                messageRes+= User.username+ `\n`

            }
        });

        fs.writeFile('votes.txt', messageRes, function (err) {
            if (err) {
                return console.error(err);
            }
        });


        message.channel.send({ files: ['./votes.txt'] });

    }
}