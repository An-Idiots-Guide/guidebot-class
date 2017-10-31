// This event executes when a new guild (server) is joined.

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {

    // We need to add this guild to our settings!
    this.client.settings.insert({id: guild.id, settings: this.client.config.defaultSettings}).run();
  }
};
