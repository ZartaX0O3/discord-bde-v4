module.exports = {
    name: "logiciels",
    category: "Information",
    aliases: ["logiciel","log"],
    cooldown: 2,
    usage: "logiciels",
    description: "Affichage des apps/programme utiles",
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]
    maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
    minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
    argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message) => {

    message.channel.send("Maintenance...");
    /*

    let pages = [
        "\n**----- 7zip -----**\nhttps://www.7-zip.org/ \n *Logiciel d'archivage OpenSource* \n**----- New Windows Terminal -----**\n https://www.microsoft.com/fr-fr/p/windows-terminal-preview/9n0dx20hk701?activetab=pivot:overviewtab \n *Le nouveau Terminal Window pour remplacé le votre* \n **----- Chocolatey -----**\nhttps://chocolatey.org/ \n*Gestionnaire de packets style apt-get pour windows* \n**----- VS Code -----**\nhttps://code.visualstudio.com/ \n *Editeur de code pour compiler de deboguer* \n**----- VS Studio -----**\nhttps://visualstudio.microsoft.com/fr/ \n*Logiciel de devellopement d'applications*\n**----- Virtual Box -----**\nhttps://www.virtualbox.org/wiki/Downloads\n *Machine virtuelle si vous voulez pas dual boot* \n**----- Putty -----**\nhttps://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html \n*Connexion SHH Windows* \n**----- X2GO -----**\nhttps://wiki.x2go.org/doku.php/doc:installation:x2goclientv \n*Connexion SSH avec visuel*",
        "\n**----- SuperF4 Xkill -----**\nhttps://stefansundin.github.io/superf4/ \n *Un super ALT-F4 de la mort*\n**----- Virustotal -----**\nhttps://www.virustotal.com/gui/ \n*Scanner en ligne de Virus*\n**----- Minimalist GNU for Windows -----**\nhttps://sourceforge.net/projects/mingw/files/latest/download \n*Packet d'outils GNU (très utile pour les tâches plus avancées*\n**----- Windows Subsystem for Linux -----**\nhttps://lecrabeinfo.net/installer-wsl-windows-subsystem-for-linux-sur-windows-10.html \n*Très utile pour s'entrainer au bash Linux via machine virtuelle*\n**----- Atom -----**\nhttps://atom.io/ \n*Editeur de texte puissant pour dev, multiples add-ons existants*\n**----- New Terminal Windows -----**\nhttps://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701?SilentAuth=1&wa=wsignin1.0#activetab=pivot:overviewtab \n*Comme son nom l'indique un autre Windows Terminal*",
        "\n**----- Postman -----**\nhttps://www.postman.com/ \n*Pour gérer facilement les requête d'API*\n**----- EarTrumpet -----**\nhttps://www.microsoft.com/fr-fr/p/eartrumpet/9nblggh516xp?activetab=pivot:overviewtab \n*Gérer le son Windows des apps*\n**----- QTTabBar -----**\nhttp://qttabbar.wikidot.com/ \n*Avoir des onglets dans l'explorateur de fichier*\n**----- Balena Etcher -----**\nhttps://www.balena.io/etcher/ \n*Logiciel pour graver des fichiers ISO sur clé*\n**----- unCSS -----**\nhttps://uncss-online.com/ \n*Site Web permettant le nettoyage de vos fichiers CSS*"
    ];
    let page = 1;

    const embed = new MessageEmbed()
        .setAuthor(message.author.username)
        .setColor("#fc0000")
        .setTitle("**Logiciel indispensables**")
        .setFooter(`Page ${page} of ${pages.length}`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setDescription(pages[page - 1])

    message.channel.send({embeds : [embed]}).then(msg => {
        msg.react('◀').then(r => {
            msg.react('❎').then(r => {
                msg.react('▶').then(r => {

                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
                    const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;
                    const crossFilter = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;

                    const backwards = msg.createReactionCollector({backwardsFilter, time: 120000});
                    const forwards = msg.createReactionCollector({forwardsFilter, time: 120000});
                    const cross = msg.createReactionCollector({crossFilter, time: 120000});

                    backwards.on('collect', (r, u) => {
                        if (page === 1) {
                            r.users.remove(u.id);
                        }
                        else {
                            page--;
                            embed.setDescription(pages[page - 1]);
                            embed.setFooter(`Page ${page} of ${pages.length}`);
                            msg.edit({embeds: [embed]});
                            r.users.remove(u.id)
                        }
                    })

                    forwards.on('collect', (r, u) => {
                        if (page === pages.length) {
                            r.users.remove(u.id);
                        }
                        else {
                            page++;
                            embed.setDescription(pages[page - 1]);
                            embed.setFooter(`Page ${page} of ${pages.length}`);
                            msg.edit({embeds: [embed]})
                            r.users.remove(u.id)
                        }
                    })

                    cross.on('collect', (r, u) => {
                        console.log("oui ?");
                        //msg.delete();
                    })
                })
            })
        })
        setTimeout(function () {
                msg.delete();
            }, 120000);
        })
        */
}
}
