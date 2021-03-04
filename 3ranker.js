var fs = require('fs')

let traits = JSON.parse(fs.readFileSync('stats.json').toString())

let waifus = []

for (let w = 0; w < 16384; w++) {
	let waifu = JSON.parse(fs.readFileSync(`waifus/${w}.json`).toString())
	waifus.push({
		id: w,
		png: `https://ipfs.io/ipfs/QmQuzMGqHxSXugCUvWQjDCDHWhiGB75usKbrZk6Ec6pFvw/${w}.png`,
		rarity: 1000000000000
	})
	for (let a in waifu.attributes) {
		for (let t in traits) {
			if (waifu.attributes[a].trait_type == traits[t].trait_type) {
				for (let v in traits[t].value) {
					if (waifu.attributes[a].value == traits[t].value[v].title) {
						waifus[w].rarity *= traits[t].value[v].rarity
						break
					}
				}
				break
			}
		}
	}
}

fs.writeFileSync('rarities.json', JSON.stringify(waifus, null, '\t'))	