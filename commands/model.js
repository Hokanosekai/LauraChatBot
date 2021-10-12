const Session = require('../Session');
const TrainAI = require("../AI/TrainAI");

module.exports = {
    name: 'model',
    loaded: true,

    run: async (message, args, client, Discord) => {
        message.channel.send("Merci de patienter......");
        const model = await TrainAI();
        model.save("file:///Users/hokanosekai/Documents/DEV/DISCORD/LauraChatBot");
        Session.setModel(model);
        message.channel.send("Model bien créé");
    }
}