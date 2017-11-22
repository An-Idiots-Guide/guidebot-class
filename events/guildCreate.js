// This event executes when a new guild (server) is joined.

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {

    this.client.user.setPresence({game: {name: `${this.client.settings.get("default").prefix}help | ${this.client.guilds.size} Servers`, type:0}});
    this.client.log("log", `New guild has been joined: ${guild.name} (${guild.id}) with ${guild.memberCount - 1} members`, "JOINED");
    const default = await this.client.settings.get("default").getField("settings").run();
    this.client.settings.insert({id:guild.id, settings:default}).run();
  }
};
