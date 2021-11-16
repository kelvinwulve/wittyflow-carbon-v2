import XLSX from 'xlsx';


/* generate an array of column objects */
export const get_cols = refstr => {
    return Object.keys(refstr);
};

export const SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "csv", "fods", "uos", "sylk", "wb*", "wq*",
].map(function(x) { return "." + x; }).join(",");


String.prototype.template = function (hash) {
	// var string = this, key; for (key in hash) string = string.replace(new RegExp('\\{' + key + '\\}','gm'), hash[key]); return string.trim()
	var string = this, key; for (key in hash) string = string.replace(/{[^{}]+}/g,function(key) {
		return hash[key.replace(/[{}]+/g, "")] || "";
	}); return string.trim();
}

export const buildMessages = ( cols, data, template ) => {
	const messages =[];

	data.map((item, key) => {
		const message = template.trim().template(item);
		const newM = { 
			"recipient" : item[cols[0]],
			"message": message,
			"length": message.length
		}
		console.log(newM)
		messages.push(newM);
	})

	return messages;
}