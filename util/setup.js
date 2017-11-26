console.log("WARNING! YOU MUST HAVE RethinkDB RUNNING IN ORDER FOR SETUP TO CONTINUE.");
const inquirer = require("inquirer");
const r = require("rethinkdbdash")();
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
  const list = await r.dbList().run();

  const answer = await inquirer.prompt({
    type: "list",
    name: "RethinkDB",
    message: "Have you created the database and tables?",
    choices: ["Yes", "No"]
  });

  if (list.includes("guidebot")) console.log("Skipping database creation. REASON: Already exists.");

  if (answer.RethinkDB  && answer.RethinkDB === "No" && !list.includes("guidebot")) {
    console.log("Automagically adding database and table.");
    await r.dbCreate("guidebot").run();
    await r.db("guidebot").tableCreate("settings");
  }

  const settings = await r.db("guidebot").table("settings").get("default").run();
  if (settings == null) {
    prompts = prompts.slice(1);
    console.log("First Start! Inserting default guild settings in the database...");
    await r.db("guidebot").table("settings").insert({"id":"default", "settings":defaultSettings}).run();
  }

  const answers = await inquirer.prompt(prompts);

  if (answers.resetDefaults && answers.resetDefaults === "Yes" && answer.RethinkDB === "Yes") {
    console.log("Resetting default guild settings...");
    const settings = await r.db("guidebot").table("settings").get("default").run();
    if (settings != null) {
      await r.db("guidebot").table("settings").get("default").delete().run();
      await r.db("guidebot").table("settings").insert({"id":"default", "settings":defaultSettings}).run();
    }
  }

  baseConfig = baseConfig.replace("{{token}}", `"${answers.token}"`);
  
  fs.writeFileSync("./config.js", baseConfig);
  console.log("REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!");
  console.log("Configuration has been written, enjoy!");
  process.exit();
}());
