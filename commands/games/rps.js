const { EmbedBuilder } = require("discord.js");
const { promptMessage } = require("../../functions");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    config: {
        name: "rps",
        category: "games",
        aliases: ['rockpaperscissors'],
        description: "Rock Paper Scissors Game. React to one of the emojis to play the game.",
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
      try
      {     const embed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: message.member.displayName, iconURL: message.author.displayAvatarURL() })
            .setFooter({ text: message.guild.members.me.displayName, iconURL: bot.user.displayAvatarURL() })
            .setDescription("**Play A Game of RPS Against The Bot!\nSelect Reactions To Play!**")
            .setTimestamp();

        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);
        await m.reactions.removeAll();

        embed
            .setDescription("")
            .addFields({ name: `**${result}**`, value: `${reacted} vs ${botChoice}` });

        m.edit(embed);

      } catch {
          return message.channel.send('**Missing Permissions - [MANAGE_MESSAGES]!**')
      }
        function getResult(me, botChosen) {
            if ((me === "🗻" && botChosen === "✂") ||
                (me === "📰" && botChosen === "🗻") ||
                (me === "✂" && botChosen === "📰")) {
                return "You won!";
            } else if (me === botChosen) {
                return "Its a tie!";
            } else {
                return "You lost!";
            }

        }

    }
}
 