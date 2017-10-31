// This event executes when a new guild (server) is left.

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {

    // Well they're gone. Let's remove them from the settings!
    this.client.settings.get(guild.id).delete().run();
  }
};
