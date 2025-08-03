const { EmbedBuilder } = require('discord.js');
const roasts = require('../../JSON/roast.json');

module.exports = {
    config: {
        name: "roast",
        category: "fun",
        noalias: [''],
        description: "Roasts people",
        usage: "[username | nickname | mention | ID]",
        accesableby: "everyone"
    },
    run: async (bot, message, args) => {

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase());

        let roast = roasts.roast[Math.floor((Math.random() * roasts.roast.length))];

        if(!args[0]) {
            const sembed = new EmbedBuilder()
                .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
                .setColor("Green")
                .setDescription("**Do You Really Want To Roast Yourself?**")
                .setFooter({ text: message.member.displayName, iconURL: message.author.displayAvatarURL() })
                .setTimestamp()
            message.channel.send(sembed);
        }
        else if (args[0]) {
            const embed = new EmbedBuilder()
                .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
                .setTitle(`${message.author.username}-`)
                .setColor("Green")
                .setDescription(`${roast}`)
                .setFooter({ text: member.displayName, iconURL: member.user.displayAvatarURL() })
                .setTimestamp()
            message.channel.send(embed);
        }
    }
}