const Discord = require('discord.js');
const fs = require('fs');

global.Sessions = {};

let model = undefined;

const self = module.exports = {
    add: (id, type) => {
       global.Sessions[id] = {
           mode: 'pattern',
           type: type,
           messages: [],
       }
    },

    addResponse: (id, type, data, question) => {
        global.Sessions[id] = {
            mode: 'response',
            type: type,
            messages: [],
            question: question,
            data: data
        }
    },

    remove: (id) => {
        delete global.Sessions[id];
    },

    receive: (message) => {
        const id = message.author.id;
        if (!global.Sessions[id]) return;
        if (message.content.toLowerCase().startsWith('endsess')) {
            self.save(id);
            self.remove(id);
            return message.reply('Ta session est échue. Merci de m\'avoir aidé à apprendre');
        }

        if (global.Sessions[id].mode === 'pattern') {
            global.Sessions[id].messages.push(message.content.toLowerCase());
        } else {
            global.Sessions[id].messages.push({
                message: message.content.toLowerCase(),
                question: global.Sessions[id].question
            });
        }

        message.react('✅');

        if (global.Sessions[id].mode === 'response') {
            let data = global.Sessions[id].data;
            let question = data.patterns[Math.floor(Math.random() * data.patterns.length)];

            const Embed = new Discord.MessageEmbed()
                .setTitle('**TRAIN**')
                .setDescription(`**Reponse à:**\n${question}`)

            message.channel.send(Embed);
            global.Sessions[id].question = question;
        }
    },

    save: (id) => {
        if (!global.Sessions[id]) return;
        const SessData = global.Sessions[id];
        console.log(SessData)

        const Data = JSON.parse(fs.readFileSync('data.json'));

        SessData.messages.forEach(msg => {
            if (Data[SessData.type][SessData.mode + "s"].find(c => c === msg)) return;

            Data[SessData.type][SessData.mode + 's'].push(msg);
        });

        fs.writeFileSync('./data.json', JSON.stringify(Data));
    },

    setModel(new_model) {
        model = new_model;
    },

    getModel() {
        return model;
    }
}