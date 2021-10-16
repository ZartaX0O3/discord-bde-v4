
module.exports = {
    name: "remind",
    category: "Information",
    aliases: ["remind","re"],
    cooldown: 10,
    usage: "remind <<time(sec)>> <<Thing to remind>>",
    description: "Affichage des votants au sondage",
    memberpermissions: ["ADMINISTRATOR"],
    requiredroles: [],
    alloweduserids: [],
    minargs: 2, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 2, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args) => {

        const temps = args[0];
        
        if(!temps) return message.reply("Un temps est nécessaire");

        args.shift();
        const remind = args.join(" ");

        message.delete();
        message.reply("Rappel prit en compte")
        setTimeout(function () {
            message.reply("Rappel toi ! " + remind)
        }, temps* 1000);
    }
}
