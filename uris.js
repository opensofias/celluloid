//uri-friendly json notation

const uriMap =
	{to: Object.freeze ({
		',"':',',
		'":':':',
		'"':"'"
})}

uriMap.from = Object.freeze (flipObj (uriMap.to))

export const toUri = obj =>
	'#' + encodeURI (
		replaceInString (
			JSON.stringify(obj)
			.slice(2,-1),
			uriMap.to
		)
	)

export const fromUri = uriString =>
	uriString.length <= 1 ? {} :
	Object.freeze (JSON.parse (
		'{"' +
		replaceInString (decodeURI(uriString.slice(1)), uriMap.from) +
		'}'
	))

const replaceInString = (string, replaceMap) =>
	Object.entries(replaceMap).reduce (
		(acc, val) => acc.split(val[0]).join(val[1]),
		string
	)