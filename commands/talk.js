

module.exports = {
    name: 'talk',
    loaded: true,

    run: async (message, args, client, Discord) => {
        /*const ErrorEmbed = new Discord.MessageEmbed()
            .setTitle('**ERROR**')*/

        //if (!args[0] || !['false', 'true'].includes(args[0])) return message.channel.send(ErrorEmbed.setDescription('Spécifie un boolean\n[false, true]'))

        global.Meta.talk = !global.Meta.talk;

        if (global.Meta.talk) {
            let Embed = new Discord.MessageEmbed()
                .setTitle("**SUCCESS**")
                .setDescription("Talk mode à été activé");
            await message.channel.send(Embed);
        } else {
            let Embed = new Discord.MessageEmbed()
                .setTitle("**SUCCESS**")
                .setDescription("Talk mode à été désactivé");
            await message.channel.send(Embed);
        }
    }
}