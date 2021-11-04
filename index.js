const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
const path = require('path')
// const db = require('./firebaseinit').admin.firestore()
const { dirRoles, lvlRoles, lvlPostId, dirPostId } = require('./config')
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
  return
  const channel = client.channels.cache.get('905440828808384542')
  if (channel) {
    const fetchedChannels = [channel]
    fetchedChannels.forEach(c => {
      c.messages.get('905450041781673995').then(msg => {
        for (emoij in dirRoles) {
          // Нужно передавать туда id
          msg.react(emoji)
        }
      })
      c.messages.get('905450630297034794').then(msg => {
        for (emoij in lvlRoles) {
          // Нужно передавать туда id
          msg.react(emoji)
        }
      })
    })
  }
})

// Событие генерится в userjoin.js
client.on('guildMemberAdd', async (member) => {
  if (!member.guild) return

  let USER = member.user
  let user_temp = {}
  for (key in USER) {
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

  await db.collection('users').doc(id).set(user_temp).catch(error => console.error("Can't add new user", error))
  console.log('Doc have been added to collection: ', user_temp)

  channel.send(message)
})

client.on('messageReactionAdd', async (reaction, user) => {
  let message = reaction.message
  if (message.channel.id == '905440828808384542') {
    let member = client.guilds.cache.get('903878049307697152').members.cache.get(user.id)
    let emoji = reaction.emoji.name
    // console.log(member)
    if (message.id == lvlPostId) {
      for (em in lvlRoles) {
        if (emoji == em) {
          member.roles.add(lvlRoles[em])
        }
      }
    } else {
      for (em in dirRoles) {
        if (emoji == em) {
          member.roles.add(dirRoles[em])
        }
      }
    }
  }
})

client.on('messageReactionRemove', async (reaction, user) => {
  let message = reaction.message
  if (message.channel.id == '905440828808384542') {
    let member = client.guilds.cache.get('903878049307697152').members.cache.get(user.id)
    let emoji = reaction.emoji.name
    // console.log(member)
    if (message.id == lvlPostId) {
      console.log('lvl')
      for (em in lvlRoles) {
        if (emoji == em) {
          member.roles.remove(lvlRoles[em])
        }
      }
    } else {
      for (em in dirRoles) {
        if (emoji == em) {
          member.roles.remove(dirRoles[em])
        }
      }
    }
  }
})

client.login(process.env.TOKEN)