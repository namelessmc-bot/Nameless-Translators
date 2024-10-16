//
//	TheCodingTrain Event-Bot
//
require('dotenv').config();

import { Client, Intents } from 'discord.js';
import path from "path";
import { readFileSync } from 'fs';

import Prefixes from "./constants/Prefixes";
import CommandHandler from "./handlers/CommandHandler/CommandHandler";
import EventHandler from "./handlers/EventHandler/EventHandler";
import LanguageManager from './handlers/LanguageManager/LanguageManager';

console.log(Prefixes.BOT + "Starting discord client");

const config = JSON.parse(readFileSync(path.join(__dirname, '../config.json'), 'utf-8'));

const client = new Client({
	messageCacheLifetime: 20,
	messageCacheMaxSize: 10,
	messageSweepInterval: 100,
	partials: ["REACTION", "MESSAGE", "CHANNEL", "GUILD_MEMBER", "USER"],
	intents: Intents.NON_PRIVILEGED
});

const commandHandler = new CommandHandler({ ignoreToken: '@' });
LanguageManager.loadLanguages(path.join(__dirname, '../language'));
export {
	client,
	commandHandler,
	config
}

new EventHandler(path.join(__dirname, './events'))
commandHandler.loadDir(path.join(__dirname, './commands'));

client.login(process.env.BOTTOKEN);