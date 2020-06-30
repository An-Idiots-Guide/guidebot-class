const Command = require("../base/Command.js");

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Latency and API response times.",
      usage: "ping",
      aliases: ["pong"]
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try {
      const msg = await message.channel.send("being appreciated...");
      msg.edit(`Round Trip & Response: \`${Date.now() - message.createdTimestamp}\` Millisecond's.\nDiscord Application Programming Interface: \`${Math.round(client.ws.ping)}\` Millisecond's)`);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Ping;
