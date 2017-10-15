const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const weather = require('weather-js');

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

    const swearWords = ["nigga", "nigger", "faggot", "fgt", "removekebab", "coon", "cunt", "nigg@", "nig", "hitler", "NIGGA", "Nigga"];
    if (swearWords.some(word => message.content.includes(word)) ) {
      message.reply("This Word is Banned!. Please do not use this word again. Warning has been Giving!");
      message.delete();
    }
    

    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");


    switch (args[0].toLowerCase()) { 
        case "ping":
        message.channel.send("Pong :ping_pong:");
        break;

        

        case "botinfo":
        message.channel.send("Nwpublic public bot only made for this community. Made by George_Fifth.");
        break;

        case "higherranks":
        var embed = new Discord.RichEmbed()
        .setTitle("Higher Ranking Admins.")
        .setThumbnail(URL="https://s1.postimg.org/44lhl7ximn/Higer_ranking.png")
        .setDescription("-----------------------------------")
        .addField("Owner", "Highlord")
        .addField("Head Admin Minisiege", "BearlyHuman")
        .addField("Head Admin EU", "BlackKnight")
        .addField("Website Manager", "Max")
        .addField("Great Sister", "Kanade Tachibana")
        .addField("Senior Admin Minsiege", "QuickOne ,Gretel , Beth ")
        .addField("Senior Admin Eu-Commander", "Diamond, Ed112, Thundgil")
        .setFooter("⚠ This list can change at any given time, Please keep an eye on the admins that are listed. ⚠")
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
        .setTitle("Minsiege Admins")
        .setThumbnail(URL="https://s1.postimg.org/26ow3unr8f/Minisiege_embed_logog.png")
        .setDescription("George_Fith, Takeout, Brandon, Zarovich, Dr.Dimples, Kemosabe, Loifas, Soda, Strategie99, Welly, Caesim.")
        .setFooter("⚠ This list can change at any given time, Please keep an eye on the admins that are listed. ⚠")
        message.channel.sendEmbed(embed);
        break;

        case "euadmins":
        var embed = new Discord.RichEmbed()
        .setTitle("Eu Commander Game Admins.")
        .setThumbnail(URL="https://s1.postimg.org/8pcmpi48z3/EUC_LOGO.png")
        .setDescription("Roenz, Old_Man_Napoleon, Mask, Firefly, Dima.")
        .setFooter("⚠ This list can change at any given time, Please keep an eye on the admins that are listed. ⚠")
        message.channel.sendEmbed(embed);
        break;

        case "cmds":
        var embed = new Discord.RichEmbed()
        .setTitle("Bot Commands!")
        .addField("-----------------------", "Don't forget to place the command right after n! <----- with no spaces.")
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
        .addField("------------------------", "weather")
        .addField("------------------------", "cmds")
        .setFooter("These Commands will change and will have more added :D");
        message.author.send({embed: embed});
        message.channel.send(message.author.toString() + " The cmds will be sent in a private message.");
        break;

        case "kick":
         {
            let member = message.mentions.members.first();
            let reason = args.slice(1).join(" ");
            member.kick(reason);
            message.reply(`${member.user.username} was succesfully kicked.`);
          }
          break;

          case "weather":
          
          {
            weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) { 
                if (err) message.channel.send(err);
    
                
                if (result.length === 0) {
                    message.channel.send('**Please enter a valid location.**') 
                    return; 
                }
    
                
                var current = result[0].current;
                var location = result[0].location; 
                
                const embed = new Discord.RichEmbed()
                    .setDescription(`**${current.skytext}**`)
                    .setAuthor(`Weather for ${current.observationpoint}`) 
                    .setThumbnail(current.imageUrl) 
                    .setColor(0x00AE86) 
                    .addField('Timezone',`UTC${location.timezone}`, true) 
                    .addField('Temperature',`${current.temperature} Degrees`, true)
                    .addField('Feels Like', `${current.feelslike} Degrees`, true)
                    .addField('Winds',current.winddisplay, true)
                    .addField('Humidity', `${current.humidity}%`, true)
    
                    
                    message.channel.send({embed});
            });
        }
        break;
          

          
        case "ban":
        {
           let member = message.mentions.members.first();
           let reason = args.slice(1).join(" ");
           member.ban(reason);
           message.reply(`${member.user.username} was succesfully banned.`);
         }
         break;

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
        message.channel.send("Invaild Command!, Type n!cmds for the public commands.");
    }
});



bot.login(TOKEN);
