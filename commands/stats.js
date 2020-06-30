const Command = require("../base/Command.js");
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

class Stats extends Command {
  constructor (client) {
    super(client, {
      name: "stats",
      description: "Gives some useful bot statistics.",
      usage: "stats",
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    const duration = moment.duration(this.client.uptime).format("Y [Year's], M [Month's], D [Day's], H [Hour's], m [Minute's], s [Second's],");
    message.channel.send(`= STATISTICS =
  • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
  • Uptime     :: ${duration}
  • Users      :: ${this.client.users.cache.size.toLocaleString()}
  • Servers    :: ${this.client.guilds.cache.size.toLocaleString()}
  • Channels   :: ${this.client.channels.cache.size.toLocaleString()}
  • Discord.js :: v${version}
  • Node       :: ${process.version}`, {code: "asciidoc"});
  }
}

module.exports = Stats;
