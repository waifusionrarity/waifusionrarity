var fetch = require('node-fetch')
var fs = require('fs')
var delay = require('delay')

async function start() {
	for (let i = 0; i < 16384; i++, await delay(100)) {
		console.log(`https://ipfs.io/ipfs/QmSURwkvvkMW3zq3A9bg9TsatQe8LLPsCQY6bJHZXNz4qJ/${i}.json`)
		fetch(`https://ipfs.io/ipfs/QmSURwkvvkMW3zq3A9bg9TsatQe8LLPsCQY6bJHZXNz4qJ/${i}.json`, {
		  "headers": {
			"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"accept-language": "en-US,en;q=0.9",
			"cache-control": "no-cache",
			"pragma": "no-cache",
			"sec-fetch-dest": "document",
			"sec-fetch-mode": "navigate",
			"sec-fetch-site": "none",
			"sec-fetch-user": "?1",
			"sec-gpc": "1",
			"upgrade-insecure-requests": "1"
		  },
		  "referrerPolicy": "strict-origin-when-cross-origin",
		  "body": null,
		  "method": "GET",
		  "mode": "cors"
		})
		.then(res => res.json())
		.then(res => {
			console.log('success')
			fs.writeFileSync(`waifus/${i}.json`, JSON.stringify(res))
		})
		.catch(err => {
			console.log(err)
			fs.appendFileSync('errors.txt', `\r\n${i}`)
		})
	}
}

start()