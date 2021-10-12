const Session = require('../Session')
const tf = require('@tensorflow/tfjs-node');
const Predict = require("../AI/Predict");
const Response = require("../AI/Response");

require('dotenv').config({path: '../.env'});

module.exports = {
    name: 'message',
    loaded: true,

    execute: async (message, client, Discord) => {
        if (!message.content.startsWith(process.env.BOT_PREFIX)){

            if (message.author.id === '850695866066534410') return;
            if (message.embeds[0] || message.attachments.size > 0) return;
            if (global.channels.includes(message.channel.id)) {
                const phrase = message.content
                let model = await tf.loadLayersModel("file:///Users/hokanosekai/Documents/DEV/DISCORD/LauraChatBot/model.json");

                if (global.Meta.talk) {
                    const predict = await Predict(phrase, model);
                    const response = await Response(predict, message.content);
                    message.channel.send(response);
                }
            }

            Session.receive(message);

        } else {
            const args = message.content.slice(process.env.BOT_PREFIX.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();

            const command = client.commands.get(commandName);
            if (!command) return;
            try {
                command.run(message, args, client, Discord);
            } catch (error) {
                console.error(error);
            }
        }
    }
}