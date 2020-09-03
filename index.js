require('dotenv').config();
const Discord = require('discord.js');
global.Discord = Discord;
const bot = new Discord.Client();
global.bot = bot;
bot.commands = new Discord.Collection();
const botCommands = require('./commands');

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === "I am Matcha") {
    const role = msg.guild.roles.find(role => role.name === "Matcha");
    msg.member.addRole(role);
    msg.reply("We are Matcha");
  }
  global.msg = msg;
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!bot.commands.has(command)) return;

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});
