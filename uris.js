//uri-friendly json notation

const flipObj = obj =>
	Object.keys(obj).reduce ((acc, key) =>
		(acc[obj[key]] = key) && acc
	, {})

const uriMap = {to: {
	',"':'&', '":':'=', '"':"~"
}}

uriMap.from = flipObj (uriMap.to)

export const toUri = obj =>
	'#' + encodeURI (
		replaceInString (
			JSON.stringify(obj)
			.slice(2, -1),
			uriMap.to
		)
	)

export const fromUri = (uriString = "") =>
	uriString.length <= 1 ? {} :
	JSON.parse ( '{"' + replaceInString (decodeURI(
		addTerminator ('~') (convertLegacy (uriString)).slice(1)
	), uriMap.from) + '}')

const addTerminator = term => uriString =>
	(uriString.split (term)).length % 2 ?
	uriString : uriString + term

const convertLegacy = string => 
	string.includes (':') ?
		console.warn ('you are using the legacy URI format, please switch') ||
		replaceInString (string, {
			':':'=', "'": '~', ',':'&'
		})
	: string

const replaceInString = (string, replaceMap) =>
	Object.entries(replaceMap).reduce (
		(acc, val) => acc.split(val[0]).join(val[1]),
		string
	)