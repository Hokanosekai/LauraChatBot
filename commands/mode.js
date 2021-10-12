module.exports = {
    name: 'mode',
    loaded: true,
    args: true,

    run: async (message, args, client , Discord) => {
        const ErrorEmbed = new Discord.MessageEmbed()
            .setTitle('**ERROR**')

        if (!args[0] || !['pattern', 'response'].includes(args[0])) return message.channel.send(ErrorEmbed.setDescription('Merci, de spécifier un mode du type [pattern, response]'));

        global.Meta.type = args[0].toLowerCase();
        const Embed = new Discord.MessageEmbed()
            .setTitle('**SUCCESS**')
            .setDescription('Le mode a bien été changé')
        await message.channel.send(Embed);
    }
}