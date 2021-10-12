module.exports = {
    name: 'selflearning',
    loaded: true,
    args: true,

    run: async (message, args, client, Discord) => {
        global.Meta.self_learning = !global.Meta.self_learning;

        if (global.Meta.self_learning) {
            let Embed = new Discord.MessageEmbed()
                .setTitle("**SUCCESS**")
                .setDescription("Self learning mode à été activé");
            await message.channel.send(Embed);
        } else {
            let Embed = new Discord.MessageEmbed()
                .setTitle("**SUCCESS**")
                .setDescription("Self learning mode à été désactivé");
            await message.channel.send(Embed);
        }
    }
}