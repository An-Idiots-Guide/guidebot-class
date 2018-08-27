const input = require("readline-sync");
const Enmap = require("enmap");
const fs = require("fs");

let baseConfig = fs.readFileSync("./util/setup_base.txt", "utf8");

const defaultSettings = {
  "prefix": "-",
  "modLogChannel": "mod-log",
  "modRole": "Moderator",
  "adminRole": "Administrator",
  "systemNotice": "true",
  "welcomeChannel": "welcome",
  "welcomeMessage": "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D",
  "welcomeEnabled": "false"
};

const settings = new Enmap({name: "settings", cloneLevel: "deep"});

(async function() {
  console.log("Setting Up GuideBot Configuration... CTRL+C if you want to manually edit config.js.example into config.js!");
  await settings.defer;
  if (settings.has("default")) {
    if (input.keyInYN("Default settings already present. Reset to default? ")) {
      settings.set("default", defaultSettings);
    }
  } else {
    console.log("First Start! Inserting default guild settings in the database...");
    settings.set("default", defaultSettings);
  }
  const isGlitch = input.keyInYN("Are you hosted on Glitch.com? ");

  if (isGlitch) {
    baseConfig = baseConfig
      .replace("{{defaultSettings}}", JSON.stringify(defaultSettings, null, 2))
      .replace("{{fullURL}}", "${process.env.PROJECT_DOMAIN}")
      .replace("{{domain}}", "`${process.env.PROJECT_DOMAIN}.glitch.me`")
      .replace("{{port}}", "process.env.PORT")
      .replace("{{token}}", "process.env.TOKEN")
      .replace("{{oauthSecret}}", "process.env.SECRET")
      .replace("{{sessionSecret}}", "process.env.SESSION_SECRET");
    console.log("REMEMBER TO PLACE THE TOKEN, SECRET AND SESSION_SECRET IN YOUR .ENV FILE!!!");
    console.log("Details: https://anidiots.guide/other-guides/hosting-on-glitch")
    fs.writeFileSync("./config.js", baseConfig);
    console.log("Configuration has been written, enjoy!");
    return;
  }

  const token = input.question("Enter the bot token from the application page: ");
  const oauthSecret = input.question("Enter the Client Secret from the application page: ");
  const saltyKey = input.question("Enter a session security passphrase (used to encrypt session data): ");
  const host = input.question("Please enter your domain name (no http prefix, port optional, e.g. localhost:8080 or www.example.com): ");
  const port = input.question("Enter the port on which to start the local server (default 81): ", {
    defaultInput: 81
  });

  baseConfig = baseConfig
    .replace("{{defaultSettings}}", JSON.stringify(defaultSettings, null, 2))
    .replace("{{fullURL}}", host)
    .replace("{{domain}}", `"${host.split(":")[0]}"`)
    .replace("{{port}}", port)
    .replace("{{token}}", `"${token}"`)
    .replace("{{oauthSecret}}", `"${oauthSecret}"`)
    .replace("{{sessionSecret}}", `"${saltyKey}"`);
  
  fs.writeFileSync("./config.js", baseConfig);
  console.log("REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!");
  console.log("Configuration has been written, enjoy!");
  await settings.close();
}());