const Discord = require('discord.js')
const { Intents, Client, Message } = require('discord.js')
const MessageEmbed = require('discord.js')
const myIntents = new Intents();
const client = new Discord.Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]});

module.exports = {
    notAuthorized
}

function notAuthorized(message) {
    message.delete({ timeout : 1000 })
    const embed = new Discord.MessageEmbed()
        .setTitle('**Not Authorized** :rage:')
        .setColor(0xFF0000)
        .setDescription(`You don't have the correct role to execute this command.`)
        .setFooter('Lethal Proxies | Powered by Skhinda#0001', 'https://pbs.twimg.com/profile_images/1340499493775699968/fpXEBDud_400x400.jpg')
    message.channel.send({ embeds : [embed]});
}