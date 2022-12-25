// RUN CODE >>> 
// cd C:\Users\aadar\Desktop\Aadarsh\Code\Discord Bot(s)\RandomPing
// nodemon --inspect RandomPing.js

const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildPresences
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//if you don't understand, dm (haha) tushar
function pingRandom(msg) {
  //0.1% chance to ping everyone
  if (Math.floor(Math.random()*1000) === 80) {
    msg.channel.send("@everyone");
    return;
  }
  let guild = msg.guild;
  //chooses number between 0-# of people in server, picks that person to ping
  guild.members.fetch()
    .then(mems => {
      let ind = Math.floor(Math.random()*mems.size);
      let user = Array.from(mems.values())[ind];
      msg.channel.send(`<@${user.user.id}>` + " follow rule 3.");
    });
}

client.on('messageCreate', msg => {
  if (msg.author.bot) return;
  let m = msg.cleanContent;
  let user = msg.author.username;

  //if the message has "ping" and the user has the "certified pinger" role, call pingRandom
  if (m.includes('@someone')) {
    if (msg.member.roles.cache.some(role => role.name === "certified pinger")) {
      pingRandom(msg);
      console.log(user + " activated ping at " + (new Date()) );
    }
    else if (user === "Aarfdark" || user === "Bobmcbobber") {
      pingRandom(msg);
      console.log(user + " activated ping at " + (new Date()) );
    }
    else {
      msg.channel.send(`<@${msg.author.id}>` + " IDIOT YOU'RE NOT A CERTIFIED PINGER");
      console.log(user + " FAILED to ping someone cuz they're a LOSER on this date: " + (new Date()));
    }
  }
  
  //reacting to specific people's messages
  if (user === "RealEnderCreeper") {
    msg.react("👩‍⚖️");
    /*msg.react("🏨");
    msg.react("🅰️");
    msg.react("🇹");
    msg.react("🇺");
    msg.react("🇸");
    msg.react("🇭");
    msg.react("🇦");
    msg.react("🇷");*/
  }
  else if (user === "herb") {
    msg.react("🍤");
  } 
  else if (user === "Bobmcbobber") {
    msg.react("🤮");
    msg.react("👩‍🎤");
  }
});

//grab login token from json file
const data = require('./login_token.json');
client.login(data.token);
