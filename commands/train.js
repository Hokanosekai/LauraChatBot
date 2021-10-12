const Session = require('../Session')
const fs = require("fs");

module.exports = {
    name: 'train',
    loaded: true,
    args: true,

    run: async (message, args, client, Discord) => {
        const ErrorEmbed = new Discord.MessageEmbed()
            .setTitle('**ERROR**')

        if (!args[0] || !['greeting', 'goodbye', 'insult', 'compliment'].includes(args[0])) return message.channel.send(ErrorEmbed.setDescription('Spécifie le type de message\n(greeting, goodbye, insult, compliment)'))

        let TrainEmbed;
        if (global.Meta.type === 'pattern') {
            TrainEmbed = new Discord.MessageEmbed()
                .setTitle('**TRAIN**')
                .setDescription('Entrez \`endsess\` pour arreter l\'entrainement\nTous les messages que vous entrerez appartiendront a la catégorie '+ args[0])
            Session.add(message.author.id, args[0]);
        } else {
            const Data = JSON.parse(fs.readFileSync('./data.json'))[args[0]];
            const response = Data.patterns[Math.floor(Math.random() * Data.patterns.length)];
            TrainEmbed = new Discord.MessageEmbed()
                .setTitle('**TRAIN**')
                .setDescription(`**Reponse à:**\n${response}`)
            Session.addResponse(message.author.id, args[0], Data, response);
        }

        await message.channel.send(TrainEmbed);
    }
}