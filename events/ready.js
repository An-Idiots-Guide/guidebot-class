module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run() {

        // Why await here? Because the ready event isn't actually ready, sometimes
        // guild information will come in *after* ready. 1s is plenty, generally,
        // for all of them to be loaded.
        await this.client.wait(1000);

        // `log` is located in `./index`, whilst `wait` is located in `./modules/functions`
        this.client.log("log", `${this.client.user.tag}, ready to serve ${this.client.users.size} users in ${this.client.guilds.size} servers.`, "Ready!");

        // We check for any guilds added while the bot was offline, if any were, they get a default configuration.
        let glds = await this.client.settings.run()
        let gld = await this.client.clean(this.client,glds[0])
        console.log(gld)
        this.client.guilds.filter(g => gld.includes(g.id) ? console.log("Bot ready to rock.") : this.client.settings.insert({id: g.id, settings: this.client.config.defaultSettings}).run())
    }
};