// This event executes when a new guild (server) is left.

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {
    if (!guild.available) return;
    const def = await this.client.settings.get("default").getField("settings").run();
    this.client.user.setPresence({game: {name: `${def.prefix}help | ${this.client.guilds.size} Servers`, type:0}});
    
    // Well they're gone. Let's remove them from the settings!
    this.client.settings.get(guild.id).delete().run();
  }
};
