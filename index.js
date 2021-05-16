const Binance = require('node-binance-api');
const sleep = require('await-sleep')
const Discord = require('discord.js');
const client = new Discord.Client();

//----------------------------------------------------------------------------------------------------------
const binance = new Binance().options({
	APIKEY: '',
	APISECRET: ''
});
const Discord_Bot_Token = '';
const USDTOTHB = '31.18';
var i = 1

//----------------------------------------------------------------------------------------------------------

async function download_balance(){
	var ticker = await binance.prices();

	var BTCusd = ticker.BTCUSDT
	var DOGEusd = ticker.DOGEUSDT
	var SHIBusd = ticker.SHIBUSDT
	var ETHusd = ticker.ETHUSDT
	var BNBusd = ticker.BNBUSDT
	var BUSDusd = ticker.BUSDUSDT
	var ADAusd = ticker.ADAUSDT

	var BTCunfix = BTCusd*USDTOTHB
	var DOGEunfix = DOGEusd*USDTOTHB
	var SHIBunfix = SHIBusd*USDTOTHB
	var ETHunfix = ETHusd*USDTOTHB
	var BNBunfix = BNBusd*USDTOTHB
	var ADAunfix = ADAusd*USDTOTHB

	var BTC = BTCunfix.toFixed(2);
	var DOGE = DOGEunfix.toFixed(2);
	var SHIB = SHIBunfix.toFixed(8);
	var ETH = ETHunfix.toFixed(2);
	var BNB = BNBunfix.toFixed(2);
	var ADA = ADAunfix.toFixed(2);

	const embed = new Discord.MessageEmbed()
	.setTitle('Binance API Balance')
	.setURL('https://www.binance.com')
	.addField('Binance BTC', `${BTC} THB\n ${BTCusd} USDT`, true)
	.addField('Binance DOGE', `${DOGE} THB\n ${DOGEusd} USDT`)
	.addField('Binance SHIB', `${SHIB} THB\n ${SHIBusd} USDT`)
	.addField('Binance ETH', `${ETH} THB\n ${ETHusd} USDT`)
	.addField('Binance BNB', `${BNB} THB\n ${BNBusd} USDT`)
	.addField('Binance ADA', `${ADA} THB\n ${ADAusd} USDT`)
	.setColor('#00b0f4')
	.setFooter('DEMO BY PHAT')
	.setTimestamp();

	console.log(i)
	i++

	return embed;
}

//----------------------------------------------------------------------------------------------------------

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message",async function(message) {

	if (message.content === '!@!@!install') {
		message.channel.send(await download_balance())
		.then((message)=> {
			setInterval(async function(){
				message.edit(await download_balance())
			}, 5000)
		});
	}

});

client.login(Discord_Bot_Token);

//----------------------------------------------------------------------------------------------------------
