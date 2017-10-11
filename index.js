const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const TOKEN = "MzU4OTg3NDg5NzAyMzEzOTg0.DKRU2g.8HLC7de1aX0X60Dew6nni5biF2I";
const PREFIX = "n!";




function genrateHex() {
    return '#'+ Math.floor(Math.random() * 16777215).toString(16);
}

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if(server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}
var bot = new Discord.Client();

var server = {};
  


bot.on('ready', () => {
    bot.user.setGame('Say n!cmds')
  })

bot.on("guildMemberAdd", function(member) {
    member.guild.channels.find("name", "general").sendMessage(member.toString() + "Welcome to Nwpublic Discord Channel.");

    member.addRole(member.guild.roles.find("name", "guest"));

    member.guild.createRole({
        name: member.user.username,
        color: genrateHex(),
        permissions: []
    }).then (function(role){
        memebr.addRole(role);
    });
});

bot.on("message",function(message) {

    const swearWords = ["nigga", "nigger", "faggot", "fgt", "removekebab", "coon", "cunt", "fuck", "nig", "hitler", "nazi", "Nazi"];
    if (swearWords.some(word => message.content.includes(word)) ) {
      message.reply("This Word is Banned!. Please do not use this word again. Warning has been Giving!");
      message.delete();
    }
    

    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");


    switch (args[0].toLowerCase()) { 
        case "ping":
        message.channel.send("Pong!");
        break;

        

        case "botinfo":
        message.channel.send("Nwpublic public bot only made for this community. Made by George_Fifth.");
        break;

        case "higherranks":
        var embed = new Discord.RichEmbed()
        .setTitle("Higher Ranking Admins.")
        .addField("-----------------------", ".")
        .addField("Owner", "Highlord")
        .addField("Head Admin Minisiege", "BearlyHuman")
        .addField("Head Admin EU", "BlackKnight")
        .addField("Website Manager", "Max")
        .addField("Great Sister", "Kanade Tachibana")
        .addField("Senior Admin Minsiege", "QuickOne")
        .addField("Senior Admin Minsiege", "Beth")
        .addField("Senior Admin Minsiege", "Gretel")
        .addField("Senior Admin Eu-Commander", "Diamond")
        .addField("Senior Admin Eu-Commander", "ed112")
        .addField("Senior Admin Eu-Commander", "Thundgil")
        .addField("GameAdmin Minsiege / Map Managers", "Futui")
        .addField("GameAdmin Minsiege / Map Managers", "Kruse")
        message.channel.sendEmbed(embed);
        break;

        case "loveme":
        message.channel.send(message.author.toString() + "  I love You <3");
        break;

        case "banappeal":
        message.channel.send("If you have been banned, please go apply at www.nwpublic.com for a unban appeal");
        break;

        case "siegeadmins":
        var embed = new Discord.RichEmbed()
        .setTitle("Minisiege Game Admins.")
        .addField("-----------------------", ".")
        .addField("GameAdmin Minsiege", "George_Fifth")
        .addField("GameAdmin Minsiege", "Takeout")
        .addField("GameAdmin Minsiege", "Brandon")
        .addField("GameAdmin Minsiege", "Zarovich")
        .addField("GameAdmin Minsiege", "Dr. Dimples")
        .addField("GameAdmin Minsiege", "kemosabe")
        .addField("GameAdmin Minsiege", "Loifas")
        .addField("GameAdmin Minsiege", "Soda")
        .addField("GameAdmin Minsiege", "Strategie99")
        .addField("GameAdmin Minsiege", "Welly")
        .addField("GameAdmin Minsiege", "Caesim")
        message.channel.sendEmbed(embed);
        break;

        case "euadmins":
        var embed = new Discord.RichEmbed()
        .setTitle("Eu Commander Game Admins.")
        .addField("-----------------------", ".")
        .addField("GameAdmin Minsiege", "Roenz")
        .addField("GameAdmin Minsiege", "Old_Man_Napoleon(Hic)")
        .addField("GameAdmin Minsiege", "Mask")
        .addField("GameAdmin Minsiege", "firefly")
        .addField("GameAdmin Minsiege", "Dima") 
        message.channel.sendEmbed(embed);
        break;

        case "cmds":
        var embed = new Discord.RichEmbed()
        .setTitle("Bot Commands!")
        .addField("-----------------------", "Don't forget to place the command right after !Nw <----- with no spaces.")
        .addField("------------------------", "ping")
        .addField("------------------------", "ban / name / reason")
        .addField("------------------------", "kick / name / reason")
        .addField("------------------------", "botinfo")
        .addField("------------------------", "higherranks")
        .addField("------------------------", "loveme")
        .addField("------------------------", "banappeal")
        .addField("------------------------", "siegeadmins")
        .addField("------------------------", "euadmins")
        .addField("------------------------", "botinfo")
        .addField("------------------------", "avatar")
        .addField("------------------------", "purge / amount = removes messages")
        .addField("------------------------", "cmds")
        .setFooter("These Commands will change and will have more added :D");
        message.author.send({embed: embed});
        break;

        case "kick":
         {
            let member = message.mentions.members.first();
            let reason = args.slice(1).join(" ");
            member.kick(reason);
            message.reply(`${member.user.username} was succesfully kicked.`);
          }
          break;
          

          
        case "ban":
        {
           let member = message.mentions.members.first();
           let reason = args.slice(1).join(" ");
           member.ban(reason);
           message.reply(`${member.user.username} was succesfully banned.`);
         }
         break;S

         case "purge":
         {
            const messagecount = parseInt(args.join(' '));
            message.channel.fetchMessages({
              limit: messagecount
            }).then(messages => message.channel.bulkDelete(messages));
          };
          
         break;

         case "avatar":
         let user = message.mentions.users.first();
         if (!user) return message.reply("You must mention a user to see their avatar!");
              message.reply(user.displayAvatarURL);
              break;
        
        case "play":
        if (!args[1]) {
            message.channel.send("Please Provide a link.")
            return;
        }
        
        if (!message.member.voiceChannel){
            message.channel.send("You must be inside a voice channel")
            return;
        }
        if(!server[message.guild.id]) server[message.guild.id] = {
            queue: []
        };

        var server = server[message.guild.id];

        server.queue.push(args[1]);

        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
            play(connection, message);

        });
        break;
        
        case "skip":
        var server = servers[message.guild.id];
        if (server.dispatcher) server.dispatcher.end();
        break;

        case "stop":
        var server = servers[message.guild.id];

        if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;

            default:
        message.channel.send("Invaild Command!, Type n! for the public commands.");
    }
});



bot.login(process.env.BOT_TOKEN);
