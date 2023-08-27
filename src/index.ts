import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import 'dotenv/config';
import ready from './listener/ready';
const TOKEN = process.env.BOT_TOKEN || '';
const CLIENT_ID = process.env.CLIENT_ID || '';
(async () => {
	const commands = [{ name: 'ping', description: 'Replies with Pong!' }];
	const rest = new REST({ version: '10' }).setToken(TOKEN);

	try {
		console.info('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

		console.info('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
	const client = new Client({ intents: [GatewayIntentBits.Guilds] });

	ready(client);

	client.on('interactionCreate', async interaction => {
		if (!interaction.isChatInputCommand()) return;

		if (interaction.commandName === 'ping') await interaction.reply('Pong!');
	});

	client.login(TOKEN);
})();
