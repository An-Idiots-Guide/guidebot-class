const Command = require("../base/Command.js");

class MyLevel extends Command {
  constructor(client) {
    super(client, {
      name: "mylevel",
      description: "Tells you your permission level for the current message location.",
      usage: "mylevel",
      guildOnly: true
    });
  }

  async run(message, args, level) {
    const friendly = this.client.config.permLevels.find(l => l.level === level).name;
    message.reply(`Your permission level is: ${level} - ${friendly}`);
  }
}

module.exports = MyLevel;
