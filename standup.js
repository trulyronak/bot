require('dotenv').config();
const Discord = require('discord.js');
global.Discord = Discord;
const bot = new Discord.Client();
global.bot = bot;
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
const moment = require('moment');

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;
const STANDUP_CHANNEL_ID = '757764015047835758';

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  const day = moment().day();
  if (day === 3 || day === 6) {
    bot.channels.get(STANDUP_CHANNEL_ID).send(`<@&750611564574408787>, what did you work on? ${day}`);
  }
});