const Command = require("../base/Command.js");

class Reload extends Command {
  constructor(client) {
    super(client, {
      name: "reload",
      description: "Reloads a command that has been modified.",
      category: "System",
      usage: "reload [command]",
      permLevel: "Bot Admin"
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    if (!args || args.size < 1) return message.reply("Must provide a command to reload. Derp.");

    let response = await this.client.unloadCommand(args[0]);
    if (response) return message.reply(`Error Unloading: ${response}`);

    response = this.client.loadCommand(args[0]);
    if (response) return message.reply(`Error loading: ${response}`);

    message.reply(`The command \`${args[0]}\` has been reloaded`);
  }
}
module.exports = Reload;
