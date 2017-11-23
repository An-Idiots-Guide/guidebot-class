const inquirer = require("inquirer");
const Enmap = require("enmap");
const r = require("rethinkdbdash")({db:"guidebot"});
const fs = require("fs");

let baseConfig = fs.readFileSync("./util/setup_base.txt", "utf8");

const defaultSettings = `{
  "prefix": "-",
  "modLogChannel": "mod-log",
  "modRole": "Moderator",
  "adminRole": "Administrator",
  "systemNotice": "true",
  "welcomeChannel": "welcome",
  "welcomeMessage": "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D",
  "welcomeEnabled": "false"
}`;

const settings = r.table("settings").get("default").run();

let prompts = [
  {
    type: "list", 
    name: "resetDefaults", 
    message: "Do you want to reset default settings?", 
    choices: ["Yes", "No"]
  },
  {
    type: "input",
    name: "token",
    message: "Please enter the bot token from the application page."
  }
];

(async function() {
  console.log("Setting Up GuideBot Configuration...");
  await settings;
  if (settings == null) {
    prompts = prompts.slice(1);
    console.log("First Start! Inserting default guild settings in the database...");
    await r.table("settings").insert({"id":"default", "settings":defaultSettings}).run();
  }

  const answers = await inquirer.prompt(prompts);

  if (answers.resetDefaults && answers.resetDefaults === "Yes") {
    console.log("Resetting default guild settings...");
    await settings;
    if (settings != null)
      await r.table("settings").get("default").update({"id":"default", "settings":defaultSettings}).run();
  }

  baseConfig = baseConfig.replace("{{token}}", `"${answers.token}"`);
  
  fs.writeFileSync("./config.js", baseConfig);
  console.log("REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!");
  console.log("Configuration has been written, enjoy!");
  await settings.close();
}());
