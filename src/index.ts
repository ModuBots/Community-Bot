import 'reflect-metadata';
import { config } from 'dotenv';
import { container } from 'tsyringe';
import { Client, GatewayIntentBits } from 'discord.js';
import mongoose from 'mongoose';

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent
  ]
});

container.registerInstance(Client, client);

async function bootstrap() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    await client.login(process.env.BOT_TOKEN);
    console.log(`Logged in as ${client.user?.tag}`);
  } catch (error) {
    console.error('Error during initialization:', error);
    process.exit(1);
  }
}

bootstrap();
