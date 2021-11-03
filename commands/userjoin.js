module.exports = {
    name: 'userjoin',
    callback: ({ message, client }) => {
        client.emit('guildMemberAdd', message.member)
    }
}