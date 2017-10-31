// The EVAL command will execute **ANY** arbitrary javascript code given to it.
// THIS IS PERMISSION LEVEL 10 FOR A REASON! It's perm level 10 because eval
// can be used to do **anything** on your machine, from stealing information to
// purging the hard drive. DO NOT LET ANYONE ELSE USE THIS


// However it's, like, super ultra useful for troubleshooting and doing stuff
// you don't want to put in a command.
const Command = require("../base/Command.js");

class Eval extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            description: "Evaluates arbitrary Javascript.",
            category:"System",
            usage: "eval <expression>",
            aliases: ["ev"],
            permLevel: "Bot Owner"
        });
    }

    async run(message, args, level) { // eslint-disable-line no-unused-vars
        const code = args.join(" ");
        try {
            const evaled = eval(code);
            const clean = await this.client.clean(this.client, evaled);
            message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${await this.client.clean(this.client, err)}\n\`\`\``);
        }
    }
}

module.exports = Eval;
