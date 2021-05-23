const Binance = require('node-binance-api');
const sleep = require('await-sleep')
const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client();
let talkedRecently = new Set();

//----------------------------------------------------------------------------------------------------------
const binance = new Binance().options({
    APIKEY: '',
    APISECRET: ''
});
const Token = '';
const USDTHB = '';
var K = 1

//----------------------------------------------------------------------------------------------------------

async function download_balance(){
    var ticker = await binance.prices();
    
    var BTCUSD = ticker.BTCBUSD
    var ETHUSD = ticker.ETHBUSD
    var BNBUSD = ticker.BNBBUSD
    
    var BTCTHBunfix = BTCUSD*USDTHB
    var ETHTHBunfix = ETHUSD*USDTHB
    var BNBTHBunfix = BNBUSD*USDTHB
    
    var BTCTHB = BTCTHBunfix.toFixed(0);
    var ETHTHB = ETHTHBunfix.toFixed(0);
    var BNBTHB = BNBTHBunfix.toFixed(0);
    
    const embed = new Discord.MessageEmbed()
    .setTitle('XR BINANCE')
    .setURL('https://www.binance.com')
    .setThumbnail('https://cdn2.scratch.mit.edu/get_image/user/62559166_60x60.png')
    .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'BTC/BUSD', value: `${BTCTHB} THB\n ${BTCUSD} BUSD`, inline: true },
        { name: 'ETH/BUSD', value: `${ETHTHB} THB\n ${ETHUSD} BUSD`, inline: true },
        { name: 'BNB/BUSD', value: `${BNBTHB} THB\n ${BNBUSD} BUSD`, inline: true },
     )
    .setImage('https://i1.wp.com/media.giphy.com/media/eb6Eg0gxHmnYY/giphy.gif?resize=502%2C282&ssl=1')
    .setColor('0x8e1b98')
    .setTimestamp()
    .setFooter('Original BY PHAT Modified BY KR1TS4D4XR', 'https://i.ibb.co/tXSFtJM/DOGE-PRO-01.png');
        
    console.log(`${client.user.tag}! Work Around`, K)
    K++
        
    return embed;
}
 //----------------------------------------------------------------------------------------------------------
    
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
    
client.on("message",async function(message) {
        
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toUpperCase();
        
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    if (talkedRecently.has(message.author.id)) {     
        message.channel.send("```Don't Flood```")      
        return;      
    }   
    if (cmd === 'INSTALL') {
            
        talkedRecently.add(message.author.id);
        setTimeout ( () => {
            talkedRecently.delete(message.author.id);
        },10000);
            
        message.channel.send(await download_balance())
       .then((message)=> {
            setInterval(async function(){
                message.edit(await download_balance())
            }, 10000)
        });
            
    } else {
        
        talkedRecently.add(message.author.id);
        setTimeout ( () => {
            talkedRecently.delete(message.author.id);
        },10000);
            
        var ticker = await binance.prices();
        var output = ticker[cmd];
        switch (output) {
            case undefined:
            message.channel.send('```No Coins In Binance```')
            break;
            default:
            const embed_success = new Discord.MessageEmbed()
            .setColor('0x8e1b98')
            .setTitle(`${cmd} : ${output}`) 
            message.channel.send(embed_success)
            break;
            }
    }
        
});
    
client.login(Token);

 //----------------------------------------------------------------------------------------------------------