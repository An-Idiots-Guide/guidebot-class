const { inspect } = require("util");

/*
FOR GUILD SETTINGS SEE set.js !
This command is used to modify the bot's default configuration values, which affects all guilds. 
If a default setting is not specifically overwritten by a guild, changing a default here will
change it for that guild. The `add` action adds a key to the configuration of every guild in
your bot. The `del` action removes the key also from every guild, and loses its value forever.
*/
const Command = require("../base/Command.js");

class Conf extends Command {
  constructor(client) {
    super(client, {
      name: "conf",
      description: "Modify the default configuration for all guilds.",
      category: "System",
      usage: "conf <view/get/edit> <key> <value>",
      guildOnly: true,
      aliases: ["defaults"],
      permLevel: "Bot Admin"
    });
  }

  async run(message, [action, key, ...value], level) { // eslint-disable-line no-unused-vars
    
  // Retrieve Default Values from the default settings in the bot.
    const defaults = await this.client.settings.get("default").getField("settings").run();
  
    // Adding a new key adds it to every guild (it will be visible to all of them)
    if (action === "add") {
      if (!key) return message.reply("Please specify a key to add");
      if (defaults[key]) return message.reply("This key already exists in the default settings");
      if (value.length < 1) return message.reply("Please specify a value");

      // `value` being an array, we need to join it first.
      defaults[key] = value.join(" ");
  
      // One the settings is modified, we write it back to the collection
      await this.client.settings.get("default").update({"settings": defaults}).run();
      message.reply(`${key} successfully added with the value of ${value.join(" ")}`);
    } else
  
    // Changing the default value of a key only modified it for guilds that did not change it to another value.
    if (action === "edit") {
      if (!key) return message.reply("Please specify a key to edit");
      if (!defaults[key]) return message.reply("This key does not exist in the settings");
      if (value.length < 1) return message.reply("Please specify a new value");

      defaults[key] = value.join(" ");

      await this.client.settings.get("default").update({"settings": defaults}).run();
      message.reply(`${key} successfully edited to ${value.join(" ")}`);
    } else
  
    // WARNING: DELETING A KEY FROM THE DEFAULTS ALSO REMOVES IT FROM EVERY GUILD
    // MAKE SURE THAT KEY IS REALLY NO LONGER NEEDED!
    if (action === "del") {
      if (!key) return message.reply("Please specify a key to delete.");
      if (!defaults[key]) return message.reply("This key does not exist in the settings");
    
      // Throw the 'are you sure?' text at them.
      const response = await this.client.awaitReply(message, `Are you sure you want to permanently delete ${key} from all guilds? This **CANNOT** be undone.`);

      // If they respond with y or yes, continue.
      if (["y", "yes"].includes(response)) {

      // We delete the default `key` here.
        delete defaults[key];
        await this.client.settings.get("default").update({"settings": defaults}).run();
      
        // then we loop on all the guilds and remove this key if it exists.
        // "if it exists" is done with the filter (if the key is present and it's not the default config!)
        this.client.guilds.forEach(async function run(guild){
          const conf = await this.client.getSettings(guild.id);
          if(conf[key]){
          delete conf[key];
          this.client.settings.get(guild.id).update({"settings":conf}).run();
          }
        }})
      
        message.reply(`${key} was successfully deleted.`);
      } else
      // If they respond with n or no, we inform them that the action has been cancelled.
      if (["n","no","cancel"].includes(response)) {
        message.reply("Action cancelled.");
      }
    } else
  
    // Display a key's default value
    if (action === "get") {
      if (!key) return message.reply("Please specify a key to view");
      if (!defaults[key]) return message.reply("This key does not exist in the settings");
      message.reply(`The value of ${key} is currently ${defaults[key]}`);

      // Display all default settings.
    } else {
      const array = [];
      Object.entries(defaults).forEach(([key, value]) => {
        array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`); 
      });
      await message.channel.send(`= Bot Default Settings =
${array.join("\n")}`, {code: "asciidoc"});    }
  }
}

module.exports = Conf;
