require('dotenv').config();
const { Client, GuildMember, IntentsBitField, EmbedBuilder, ActivityType} = require('discord.js');
const { Player, QueryType } = require("discord-player");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,

    ],
});

const player = new Player(client);

//c for client
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online!`);

    client.user.setActivity({
        name: 'Anime',
        type: ActivityType.Watching,
        // url: 'https://www.twitch.tv/monstercat',
    });
});

client.on('messageCreate', (message) => {
    // If the message is from a bot, ignore it
    if (message.author.bot) {
        return;
    }
    if (message.content === 'hi bot') {
        message.reply('Halo bos');
    }
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'play') {
        const song = interaction.options.get('song');
        interaction.reply(song.value + ' is now playing');
        
    }

    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('Embed title')
            .setDescription('This is an embed message')
            .setColor('Random')
            .addFields({ 
                name: 'Field title', 
                value: 'random value', 
                inline: true, 
            }, {
                name: 'Field title 2',
                value: 'random value 2',
                inline: true,
            });
        interaction.reply({ embeds: [embed] });
    }
});

client.login(process.env.TOKEN);

