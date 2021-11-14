const DiscordJS = require('discord.js')

const embedInfoWorkflow = new DiscordJS.MessageEmbed()
    .setTitle('🥅 Наша цель')
    .setColor('#FD7279')
    .addFields([
        {
            name: 'Для чего этот сервер?',
            value: `Здесь вы познакомитесь со 🧑‍💻 **специалистами** в различных сферах и начнёте **участвовать в проектах**\n\nС **определённого уровня** 📈 вы сможете начать работать за деньги, выполняя заказы.\n**Не верите? - Спросите у наставников**`
        },
        {
            name: 'Что за проекты?',
            value: `Мы **реализуем идеи**, на которые набралась **команда**.\nВсе 💡 **идеи** в Agile-доске Trello: https://trello.com/invite/b/fFBotYmp/62e73d193e579fb8902853272cf5a09b/it-%D0%B3%D0%BB%D0%B0%D0%B7%D0%BE%D0%B2\n\nИщем в доске **идею** или **предлагаем** свою\n⇓\n🤝🏻 Набираем себе **команду**\n⇓\nПереходим в другую доску и начинаем работать над проектом как **настоящая команда**\n\nВы можете предложить проект в канале **"идеи"**\n*Подробнее про проекты могут рассказать наставники*`
        },
        {
            name: 'Что за "определённый уровень"?',
            value: '- После нескольких проектов вы можете попросить наставника **оценить ваши навыки**\n- Вы можете **повысить** свой **уровень**, попросив об этом наставника или администратора'
        },
        {
            name: 'Как мне набрать команду?',
            value: 'Легко!😃 - Просто **напишите** об этом **в чат** по направлению в котором вы развиваетесь'
        }
    ])
    .setImage(`https://i.ibb.co/RPy9v2q/developing.png`)
    .setAuthor('IT-Глазов')
    .setThumbnail('https://sun9-41.userapi.com/impg/c857036/v857036501/3dc24/UlT2ZvHYQpQ.jpg?size=259x315&quality=96&sign=c7f15a59f71fbe2d67bc515ea5db94bb&type=album')


const embedInfoMentors = new DiscordJS.MessageEmbed()
    .setTitle(`Информация о наставниках`)
    .setColor('#A5EF00')
    .addFields([
        {
            name: '🌐 Web-разработка',
            value: `🧑‍💻 **Роман Грачёв**\n - Различная информация и тд wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n\nВКонтакте: https://vk.com/grachevrv\nМобилный телефон: 89068970429\nDiscord: Roman_Gr#6347\nGitHub: https://github.com/qbclub`
        },
        {
            name: '☕ Java',
            value: `🧑‍💻 **Артём Никулин**\n - Различная информация и тд wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n\nВКонтакте: https://vk.com/nikulinme\nInstagram: 
        https://www.instagram.com/nikulin.me/\nDiscord: Tema Nick#6586\nGitHub: https://github.com/nikulin-me`
        },
        {
            name: '🦈 С#',
            value: `🧑‍💻 **Игорь Осаволюк**\n - Различная информация и тд wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n\nDiscord: IgorOsavoluk#7799`
        },
        {
            name: '🐍 Python',
            value: `🧑‍💻 **Григорий Дзюин**\n - Различная информация и тд wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww\n\nВКонтакте: https://vk.com/jet_green\nТелефон: 79127528879\nGitHub: https://github.com/Jet-Green\nDiscord: GrishaDzyin#1554`
        },
    ])

    .setThumbnail('https://sun9-41.userapi.com/impg/c857036/v857036501/3dc24/UlT2ZvHYQpQ.jpg?size=259x315&quality=96&sign=c7f15a59f71fbe2d67bc515ea5db94bb&type=album')
    .setAuthor('IT-Глазов');

const directionEmbed = new DiscordJS.MessageEmbed()
    .setTitle('Добро пожаловать в IT сообщество Глазова!')
    .setColor('#A5EF00')
    .setDescription(`**Выберите в каком направлении вы хотите развиваться:** \n1. 🌐 - Web-разработка \n2. ☕ - Java\n3. 🦈 - C#\n4. 🐍 - Python\n5. 👀 - Пока смотрю`)
    .setFooter('Щёлкните по смайлику, соответствующему вашему решению\nВаш выбор очень важен для нас')

const lvlEmbed = new DiscordJS.MessageEmbed()
    .setColor('#A5EF00')
    .setTitle('Уровни')
    .setDescription(`1. 💫 - ученик*(ни одного проекта за плечами)*\n2. 🌘 - начинающий\n3. 🌗 - продвинутый\n4. 🌖 - профи\n\nРоль "ученик" выдаётся всем автоматически, а для получения остальных вы должны подтвердить свои навыки`)
// .setFooter(`Щёлкните по смайлику, соответствующему вашему решению\nВаш выбор очень важен для нас`)

// const directionEmbed = new DiscordJS.MessageEmbed()
//     .setTitle('Добро пожаловать в IT сообщество Глазова!')
//     .setColor('#FD7279')
//     .setDescription(`**Выберите в каком направлении вы хотите развиваться:** \n1. 🌐 - Web-разработка \n2. 🐍 - Python\n3. ☕ - Java\n4. 🦈 - C#\n5. 👀 - Пока смотрю`)
//     .setFooter('Щёлкните по смайлику, соответствующему вашему решению\nВаш выбор очень важен для нас')

module.exports = {
    "infoEmbeds": [embedInfoWorkflow, embedInfoMentors],
    "welcomeEmbeds": [directionEmbed, lvlEmbed]
}