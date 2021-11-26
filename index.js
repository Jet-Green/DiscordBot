const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
const path = require('path')
const db = require('./firebaseinit').admin.firestore()
const { dirRoles, lvlRoles, lvlPostId, dirPostId } = require('./config')
require('dotenv').config()
const { Intents } = DiscordJS
// https://colorscheme.ru/#5B31Tw0w0w0w0 Color scheme

// bot init
const client = new DiscordJS.Client({
  partials: ['MESSAGE', 'REACTION'],
  intents:
    [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGE_TYPING
      // Intents.FLAGS.MESSAGE_CREATE
      // Intents.FLAGS.GUILD_PRESENCES
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
  // info
  const infoChannel = client.channels.cache.get('907286503359664138')
  infoChannel.messages.fetch().then(messages => {
    messages.forEach(m => m.delete())
  }).catch(e => consle.error(e));
  // ) {
  // m.delete()
  // }
  const embeds = require('./features/embeds');

  infoChannel.send({ embeds: embeds.infoEmbeds });
  // info
  // welcome
  const welcomeChannel = client.channels.cache.get('905440828808384542')
  welcomeChannel.messages.fetch().then(messages => {
    messages.forEach(m => m.delete())
  }).catch(e => consle.error(e));
  // direction
  welcomeChannel.send({ embeds: [embeds.welcomeEmbeds[0]] })
    .then((m) => {
      for (emoji in dirRoles) {
        // Нужно передавать туда id
        m.react(emoji)
      }
    })
  welcomeChannel.send({ embeds: [embeds.welcomeEmbeds[1]] })
  // welcome


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
// @TODO
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
  delete user_temp.flags

  await db.collection('users').doc(id).set(user_temp).catch(error => console.error("Can't add new user", error))
  console.log('Doc have been added to collection: ', user_temp)

  channel.send(message)

  // let members = client.guilds.cache.get('903878049307697152').members.cache
  // ${members.get('714189094581829632').username}
  let jd = member.joinedAt
  var embed = new DiscordJS.MessageEmbed()
    .setTitle(`Привет, ${member.displayName}`)
    .setColor('#FB000D')
    .setDescription(`Добро пожаловать на наш сервер. Здесь вы найдёте единомышленников, поучаствуете в проектах и получите много опыта.\n
    У нас есть: \n- Web-разработка - Наставник Роман Грачёв(Roman_Gr#6347)\n- C# - Наставник Игорь Осаволюк(IgorOsavoluk#7799)\n- Java - Наставник Артём Никулин(Tema Nick#6586)\n- Python - Наставник Григорий Дзюин(GrishaDzyin#1554)\n\nЧтобы нам было легче подобрать вам команду, пожалуйста, напишите о себе несколько предложений(ваши навыки, можете прикрепить ссылки на свой GitHub, LinkedIn). Постарайтесь написать всю информацию в одном сообщении`)
    .setFooter(`Присоединились ${jd.getDate()}.${jd.getMonth()}.${jd.getFullYear()}`)
    .setThumbnail('https://sun9-41.userapi.com/impg/c857036/v857036501/3dc24/UlT2ZvHYQpQ.jpg?size=259x315&quality=96&sign=c7f15a59f71fbe2d67bc515ea5db94bb&type=album')
    .setAuthor('IT-Глазов')

  member.createDM().then(async DMchannel => {
    await DMchannel.send({ embeds: [embed] })
    const filter = m => m.content.includes(' ')
    // Сообщения собираются 6 дней
    const collector = new DiscordJS.MessageCollector(DMchannel, { filter, max: 1, time: 1000 * 60 * 60 * 24 * 6 })
    var description = []
    collector.on('collect', m => {
      console.log('collect message: ', m.content)
      description.push(m.content)
    })
    collector.on('end', async m => {
      DMchannel.send('Спасибо за предоставленную информацию!')
      await db.collection('users').doc(m.first().author.id).update({ "description": description })
    })
  })
})

client.on('messageReactionAdd', async (reaction, user) => {
  let message = reaction.message

  if (message.channel.id == '905440828808384542') {
    let member = client.guilds.cache.get('903878049307697152').members.cache.get(user.id)
    let emoji = reaction.emoji.name
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
    if (message.id == lvlPostId) {
      console.log('lvl rm')
      for (em in lvlRoles) { if (emoji == em) { member.roles.remove(lvlRoles[em]) } }
    } else {
      console.log('dir rm')
      for (em in dirRoles) { if (emoji == em) { member.roles.remove(dirRoles[em]) } }
    }
  }
})
// @TODO: update nickname
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  // If the role(s) are present on the old member object but no longer on the new one (i.e role(s) were removed)
  const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
  if (removedRoles.size > 0) {
    console.log(`The roles ${removedRoles.map(r => r.name)} were removed from ${oldMember.displayName}.`);
  }

  // If the role(s) are present on the new member object but are not on the old one (i.e role(s) were added)
  const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
  if (addedRoles.size > 0) {
    console.log(`The roles ${addedRoles.map(r => r.name)} were added to ${oldMember.displayName}.`);
  }
  updateRolesInDB(newMember, newMember.user)
});

async function updateRolesInDB(member, user) {
  roles = []
  for (let role of member.roles.cache.values()) {
    roles.push({
      id: role.id,
      name: role.name
    })
  }
  console.log(roles)
  await db.collection('users').doc(user.id)
    .update({ "roles": roles })
    .catch(error => console.error("Can't update user's role", error))
}

client.login(process.env.TOKEN)