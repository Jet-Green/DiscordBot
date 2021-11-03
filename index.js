const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
const path = require('path')
const db = require('./firebaseinit').admin.firestore()

require('dotenv').config()
const { Intents } = DiscordJS

// bot init
const client = new DiscordJS.Client({
  partials: ['MESSAGE', 'REACTION'],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})
// bot init

// on bot start
client.on('ready', async () => {
  console.log('Bot is ready')

  new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    featureDir: path.join(__dirname, 'features'),
  }).setDefaultPrefix('.')
})

// Событие генерится в userjoin.js
client.on('guildMemberAdd', async (member) => {
  if (!member.guild) return

  let USER = member.user
  let user_temp = {}
  for(key in USER) {
    if (USER[key] === undefined) 
      USER[key] = null;
    user_temp[key] = USER[key];
  }

  const channel = member.guild.channels.cache.find(ch => ch.id === '903878049307697155')
  
  var message = `${member}, \nДобро пожаловть на сервер ${member.guild.name}.\nВы ${member.guild.memberCount} участник`
  
  // var message = new  DiscordJS.MessageEmbed(title)
    // .setTitle(title)
    // .setAuthor('Admin')
    // .setColor('GREEN')

  let id = user_temp.id
  // CLEAN THE OBJECT
  delete user_temp.id
  delete user_temp.flags
  delete user_temp.accentColor
  delete user_temp.banner

  await db.collection('users').doc(id).set(user_temp)
  console.log('Doc have been added to collection: ', user_temp)

  channel.send(message)
})

client.login(process.env.TOKEN)