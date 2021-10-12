const fs = require('fs');
const Session = require('../Session');
const Predict = require('../AI/Predict')
const Reponse = require('../AI/Response')
const tf = require('@tensorflow/tfjs-node');


module.exports = {
    name: 'lnr',
    loaded: true,

    run: async (message, args, client, Discord) => {
        let model = Session.getModel();
        if (!model) {
            model = await tf.loadLayersModel("file:///Users/hokanosekai/Documents/DEV/DISCORD/LauraChatBot/model.json");
            Session.setModel(model);
        }

        const phrase = args.join(' ');
        console.log(phrase)
        if (!phrase) {
            const ErrorEmbed = new Discord.MessageEmbed()
                .setTitle("**ERROR**")
                .setDescription("Merci de spécifier du text");
            return message.channel.send(ErrorEmbed);
        }

        const predict = await Predict(phrase, model);
        const response = await Reponse(predict, phrase);
        console.log(predict, response)

        //message.channel.startTyping();

        const Embed = new Discord.MessageEmbed()
            .setTitle('IA Predictions')
            .setDescription(`**PREDIS - ${predict.predicted.str}**\n${phrase}\nGreeting : ${predict.predictions[0]}\nGoodbye : ${predict.predictions[1]}\nInsult : ${predict.predictions[2]}\nCompliment : ${predict.predictions[3]}`)
        await message.channel.send(Embed)

        /*message.channel.stopTyping();
        message.channel.send();

        if (global.Meta.self_learning && highest[1 > 0.6]) {
            if (DataT[predicted.toLowerCase()].patterns.includes(phrase)) return;

            DataT[predicted.toLowerCase()].patterns.push(phrase);
            fs.writeFileSync('./data.json', JSON.stringify(DataT));
        }*/
    }
}