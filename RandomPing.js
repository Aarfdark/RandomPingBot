// RUN CODE >>> 
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
//grab login token (and other secret data) from json file
const data = require('./login_token.json');

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
      let users = Array.from(mems.values());
      
      let usersFiltered = [];

      //DOESN'T  LLLLLLLLLLLLLLL | uses Array.filter with [user has role valid pinging role to create array of valid users]
      //manually double for-loop to find the people with the pinging role
      users.forEach(u => {
        u.roles.cache.forEach(role => {
          if (role.name === "🎲" || role.name === "certified pinger")
            usersFiltered.push(u.id);
        });
      });

      let ind = Math.floor(Math.random()*usersFiltered.length);
      
      let member = usersFiltered[ind];
      msg.channel.send(`<@${member}>` + " follow rule 3.");
    });
}

client.on('messageCreate', msg => {
  if (msg.author.bot) return;

  let m = msg.cleanContent;
  let user = msg.author.username;
  let myChan = client.channels.cache.get(data.myChan);
  let grantChan = client.channels.cache.get(data.grantChan);

  //if the message has "@someone" and the user has the "certified pinger" role, call pingRandom
  if (m.includes('@someone')) {
    //if @someone happens in something that's not my personal server or grant's #spam channel, it doesn't work
    if (msg.channel !== myChan && msg.channel !== grantChan ) {
      console.log(user + " tried to ping in an invalid channel")
      return;
    }
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
  if (user === data.judge) {
    msg.react("👩‍⚖️");
    // msg.react("🏨");
    // msg.react("🅰️");
    // msg.react("🇹");
    // msg.react("🇺");
    // msg.react("🇸");
    // msg.react("🇭");
    // msg.react("🇦");
    // msg.react("🇷");
  }
  else if (user === data.biden) {
    msg.react("🍤");
  } 
  else if (user === data.jrant) {
    msg.react("🤮");
    msg.react("👩‍🎤");
  }
  else if (user === data.L) {
    msg.react("🍍");
    msg.react("🍕");
  }
});

client.login(data.token);
