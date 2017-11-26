# Guide Bot

An example of a Discord.js Bot Handler. Updated and Maintained by the Idiot's Guide Community.

Ages ago, Guide Bot was actually a little bot I had on the official discord.js server.
It helped me link to the d.js bot making guide I was building, with links.
This bot grew into something that I could show new coders and bot makers, but
over time it grew into a full framework - one that is now under the hands of a
group of contributors, and no longer easily "understandable" by the majority
of our newbies. So I've pulled the original Guide Bot out of the mothballs,
gave it a fresh coat of paint and grease, and here it is back in its full glory!

This command handler is 98% compatible with [Evie's selfbot](https://github.com/eslachance/evie.selfbot)
and 99% compatible with commands from [York's Tutorial Bot](https://github.com/AnIdiotsGuide/Tutorial-Bot/tree/Episode-10-Part-2).

## Requirements

- `git` command line ([Windows](https://git-scm.com/download/win) | [Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) | [MacOS](https://git-scm.com/download/mac)) installed
- `node` [Version 8.0.0 or higher](https://nodejs.org)
- `rethinkdb` [Version 2.3.6 or higher](https://www.rethinkdb.com/)

You also need your bot's token. This is obtained by creating an application in
the Developer section of discordapp.com. Check the [first section of this page](https://anidiots.guide/getting-started/the-long-version.html)
for more info.

## Setting up the Database

Once you've installed RethinkDB for your Operating System you will need to create the Database **guidebot** and Table **settings**

> If you have access to the Administration Console [Accessible by going to **127.0.0.1:8080**] continue by following these steps:

- Go to the **Tables** tab
- Click **+ Add Database**
- Set the name as **guidebot**
- In the database, click **+ Add Table**
- Set the name as **settings**

> If you do not have access to the Administration Console, the installer will do it for you.

Once the following steps are complete, the bot will function as normal.

## Downloading

In a command prompt in your projects folder (wherever that may be) run the following:

`git clone https://github.com/An-Idiots-Guide/guidebot-class.git`

Once finished:

In the folder from where you ran the git command, run `cd guidebot-class` and then run `npm install`, which will install the required packages,
and it will then run the installer, make sure you have your token at hand to paste into the console.

**WARNING** Have RethinkDB running before you start the installation process.

The installer will create the `config.js` file for you.

## Starting the bot

To start the bot, in the command prompt, run the following command:
`node index.js`

## Inviting to a guild

To add the bot to your guild, you have to get an oauth link for it.

You can use this site to help you generate a full OAuth Link, which includes a calculator for the permissions:
[https://finitereality.github.io/permissions-calculator/?v=0](https://finitereality.github.io/permissions-calculator/?v=0)
