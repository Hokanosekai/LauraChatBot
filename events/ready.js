module.exports = {
    name: 'ready',
    loaded: true,

    execute: async (client, Discord) => {
        await client.user.setStatus('dnd');
        await client.user.setActivity('Je recolte des données');
        console.log('client ready');
    }
}