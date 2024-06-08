require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
    name: 'play',
    description: "Play music in a voice channel",
    options: [
        {
            name: 'song',
            type: ApplicationCommandOptionType.String,
            description: 'The song you want to play',
            required: true,
        },
    ],
    },
    {
    name: 'embed',
    description: "Send an embed message",
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(`There was an error refreshing application (/) commands: ${error}`);
    }
})();