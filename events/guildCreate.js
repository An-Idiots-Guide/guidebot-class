// This event executes when a new guild (server) is joined.

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {
    const def = await this.client.settings.get("default").getField("settings").run();
    this.client.user.setPresence({game: {name: `${def.prefix}help | ${this.client.guilds.size} Servers`, type:0}});
    this.client.logger.log(`New guild has been joined: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members`);
    this.client.settings.insert({"id":guild.id, "settings": def}).run();
  }
};
