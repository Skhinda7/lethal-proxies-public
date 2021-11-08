const Discord = require('discord.js')
const { Intents, Client, Message } = require('discord.js')
const MessageEmbed = require('discord.js')
const myIntents = new Intents();
const client = new Discord.Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]});
const prefix = ('!');
const dataChecker = require('./commands/dataChecker.js');
const subnetStatus = require('./commands/subnetstatus.js');
const misc = require('./commands/miscellaneous.js')
const buyElite = require('./commands/buyElite.js')
const pricing = require('./commands/price.js');
const buyVital = require('./commands/buyVital.js');
const admin = require('./commands/admin.js');
const buyToxic = require('./commands/buyToxic.js');
const add = require('./commands/addData.js');
const remove = require('./commands/removeData.js');
const check = require('./commands/checkUsers.js');



const {
    ownerID,
    supportID,
    token,
} = require(`./commands/config.json`);
const logo = ('https://pbs.twimg.com/profile_images/1434037784931602434/Zdq0N7y7_400x400.jpg');
const footer = ('Lethal Proxies | Powered by Skhinda#0001');
const coupon = require('./commands/coupon.js');
const { EventEmitter } = require('puppeteer');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence({
        status: "online",  // You can show online, idle... Do not disturb is dnd
        activity: {
            name: "Lethal Proxies",  // The message shown
            type: "PLAYING"
        }
    })
});

client.on('messageCreate', message => { //Displays Pricing
    if(message.content === prefix + 'pricing') {
        pricing.price(message);
    }
});

client.on('messageCreate', message => {
    if(message.content === prefix + 'unlock') { //Unlocked Subnet
        if(message.member.roles.cache.has(ownerID)) {
        subnetStatus.unlocked(message);
        } else {
            misc.notAuthorized(message);
        }
    }
});

client.on('messageCreate', message => { //Locked Subnet
    if(message.content === prefix + 'lock') {
        if(message.member.roles.cache.has(ownerID)) {
        subnetStatus.locked(message);
        } else {
            misc.notAuthorized(message);
        }
    }
});

client.on('messageCreate', message => { //Check All Data
    if(message.content === prefix + 'check') {
        if(message.member.roles.cache.has(supportID)) {
        dataChecker.checkAll(message)
        } else {
            misc.notAuthorized(message);
        }
    }
});

client.on('messageCreate', message => { //Check Elite Balance
    if(message.content === prefix + 'checkelite') {
        if(message.member.roles.cache.has(supportID)) {
        dataChecker.checkElite(message)
        } else {
            misc.notAuthorized(message);
        }
    }
});

client.on('messageCreate', message => { //Check Vital Balance
    if(message.content === prefix + 'checkvital') {
        if(message.member.roles.cache.has(supportID)) {
        dataChecker.checkVital(message)
        } else {
            misc.notAuthorized(message);
        }
    }
});

client.on('messageCreate', message => {   //Top-up Elite
    if(message.content === prefix + 'topelite') {
        if(message.member.roles.cache.has(supportID)) {
        buyElite.topup(message)
            }       else {
                    misc.notAuthorized(message);
        }
    }
});

client.on('messageCreate', message => {   //Buy Elite
    const args = message.content.split(' ')
    if(args[0] === prefix + 'buyelite') {
        if(message.member.roles.cache.has(supportID)) {
        buyElite.purchase(message, args)
            }       else {
                    misc.notAuthorized(message);
        }
    }
});

client.on('messageCreate', message => {   //Top-up Vital
    const args = message.content.split(' ')
    if(message.content === prefix + 'topvital') {
        if(message.member.roles.cache.has(supportID)) {
        buyVital.topup(message);
            } else {
                misc.notAuthorized(message);
        }
    }
});

client.on('messageCreate', message => {   //Buy Vital
    const args = message.content.split(' ')
    if(args[0] === prefix + 'buyvital') {
        if(message.member.roles.cache.has(supportID)) {
        buyVital.purchase(message, args);
            } else {
                misc.notAuthorized(message);
        }
    }
});

client.on('messageCreate', message => { //Buy Toxic
    const args = message.content.split(' ')
    if(args[0] === prefix + 'buytoxic') {
        if(message.member.roles.cache.has(ownerID)) {
        buyToxic.purchase(message, args) 
        } else {
            misc.notAuthorized(message);
        }
    } 
});

client.on('messageCreate', message => { //Discount Code
    if(message.content === prefix + 'coupon') {
        coupon.couponCode(message);
    }
});

client.on('messageCreate', message => {
    if(message.content === prefix + 'adminhelp') {
        message.delete({timeout : 2000})
        if(message.member.roles.cache.has(supportID)) {
            admin.commands(message);
        } else {
            misc.notAuthorized(message);
        }
    }
});

client.on('messageCreate', message => { //Add Elite Data to Sub-User
    const args = message.content.split(' ')
    if(args[0] === prefix + 'addelite') {
        message.delete({timeout: 2000})
        if(message.member.roles.cache.has(ownerID)) {
            add.addElite(message, args)
        } else {
            misc.notAuthorized(message);
        }
    }
});

client.on('messageCreate', message => { //Add Vital Data to Sub-User
    const args = message.content.split(' ')
    if(args[0] === prefix + 'addvital') {
        message.delete({timeout: 2000})
        if(message.member.roles.cache.has(ownerID)) {
            add.addVital(message, args)
        } else {
            misc.notAuthorized(message);
        }
    }
});

client.on('messageCreate', message => { //Remove Vital Data from Sub-User
    const args = message.content.split(' ')
    if(args[0] === prefix + 'removevital') {
        message.delete({timeout: 2000})
        if(message.member.roles.cache.has(ownerID)) {
            remove.removeVital(message, args)
        } else {
            misc.notAuthorized(message);
        }
    }
});

client.on('messageCreate', message => { //Check Vital Sub-User
    const args = message.content.split(' ')
    if(args[0] === prefix + 'checkvital') {
        message.delete({timeout: 2000})
        if(message.member.roles.cache.has(ownerID)) {
            check.checkVitalUser(message, args)
        } else {
            misc.notAuthorized(message);
        }
    }
});

client.on('messageCreate', message => { //Check Vital Sub-User
    const args = message.content.split(' ')
    if(args[0] === prefix + 'allelite') {
        message.delete({timeout: 2000})
        if(message.member.roles.cache.has(ownerID)) {
            check.checkAllElite(message, args)
        } else {
            misc.notAuthorized(message);
        }
    }
});
client.login(token);