import { client } from "..";
import Prefixes from "../constants/Prefixes";
import LanguageModel from "../db/model/LanguageModel";

export default {
	name: 'ready',
	once: false,
	run() {

		// Logging that the bot is ready
		console.log(Prefixes.BOT + client.user?.tag + " is ready!");

		// Initializing database models
		LanguageModel.sync();
	}
}