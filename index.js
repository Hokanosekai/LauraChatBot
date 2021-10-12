const fs = require("fs");
const Discord = require('discord.js');
require('dotenv').config({path: '.env'});

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

global.Meta = {
    self_learning: false,
    type: 'response',
    talk: false
};

global.channels = [
    '850318241515700224',
    '839238006133358592',
    '815267069946888224',
];

/* Commands Handler */
const command_files = fs.readdirSync(`./commands`).filter(file => file.endsWith('js'));
for (const file of command_files) {
    const command = require(`./commands/${file}`);
    if (!command.loaded) console.log(`    > ${command.name}   not loaded`);
    else {
        client.commands.set(command.name, command);
        console.log(`    > ${command.name}   loaded`);
    }
}

/* Events Handler */
const event_files = fs.readdirSync(`./events`).filter(file => file.endsWith('js'));
for (const file of event_files) {
    const event = require(`./events/${file}`);
    if (!event.loaded) console.log(`    > ${event.name}   not loaded`)
    else {
        client.on(event.name, (...args) => event.execute(...args, client, Discord))
        console.log(`    > ${event.name}   loaded`)
    }
}

client.login(process.env.DISCORD_TOKEN);


