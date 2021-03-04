var fs = require('fs')

let traits = [
	{"trait_type":"HeadAccessory","value":[]},
	{"trait_type":"headaccessoryStyle","value":[]},
	{"trait_type":"Top","value":[]},
	{"trait_type":"TopColor","value":[]},
	{"trait_type":"Bottom","value":[]},
	{"trait_type":"BottomColor","value":[]},
	{"trait_type":"Wings","value":[]},
	{"trait_type":"WingsColor","value":[]},
	{"trait_type":"Tail","value":[]},
	{"trait_type":"TailColor","value":[]},
	{"trait_type":"HandAccessory","value":[]},
	{"trait_type":"Skintone","value":[]},
	{"trait_type":"BodySize","value":[]},
	{"trait_type":"Background","value":[]},
	{"trait_type":"BackgroundStyle","value":[]},
	{"trait_type":"Face","value":[]},
	{"trait_type":"Hairstyle","value":[]},
	{"trait_type":"HairColor","value":[]},
	{"trait_type":"Eyes","value":[]},
	{"trait_type":"SpeechBubble","value":[]},
	{"trait_type":"Socks","value":[]},
	{"trait_type":"SocksColor","value":[]},
	{"trait_type":"NeckAccessory","value":[]},
	{"trait_type":"NeckAccessoryColor","value":[]},
]

for (let w = 0; w < 16384; w++) {
	let waifu = JSON.parse(fs.readFileSync(`waifus/${w}.json`).toString())
	for (let a in waifu.attributes) {
		for (let t in traits) {
			if (waifu.attributes[a].trait_type == traits[t].trait_type) {
				let has = 0
				for (let v in traits[t].value) {
					if (waifu.attributes[a].value == traits[t].value[v].title) {
						has = 1
						traits[t].value[v].count++
						break
					}
				}
				if (!has) {
					traits[t].value.push({
						title: waifu.attributes[a].value,
						count: 1
					})
				}
				break
			}
		}
	}
}

for (let t in traits) {
	let sum = 0
	for (let v in traits[t].value) {
		sum += traits[t].value[v].count
	}
	for (let v in traits[t].value) {
		traits[t].value[v].rarity = traits[t].value[v].count / sum
	}
}

fs.writeFileSync('stats.json', JSON.stringify(traits))