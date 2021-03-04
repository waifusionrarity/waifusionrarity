var fs = require('fs')
var ExcelJS = require('exceljs')

async function toExcel() {
	var rarities = JSON.parse(fs.readFileSync(`rarities.json`).toString())
	
	var workbook = new ExcelJS.Workbook()
	var sheet = workbook.addWorksheet('ETH')

	sheet.columns = [
	  {header: 'ID', key: 'id', width: 7},
	  {header: 'Link', key: 'png', width: 90},
	  {header: 'Rarity (smaller is better)', key: 'rarity', width: 25}
	];

	for (let r in rarities) {
		sheet.addRow(rarities[r])
	}

	await workbook.xlsx.writeFile('waifu.xlsx')
}

toExcel()