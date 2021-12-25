//uri-friendly json notation

const flipObj = obj =>
	Object.keys(obj).reduce ((acc, key) =>
		(acc[obj[key]] = key) && acc
	, {})

const uriMap = {to: {
	',"':'&', '":':'=', '"':"~"
}, legacy : {
	':':'=', "'": '~', ',':'&'
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
		addTerminator ('~') (
			uriString.includes (':') ?
				replaceInString (uriString, uriMap.legacy) : legacy
		).slice(1)
	), uriMap.from) + '}')

const addTerminator = term => uriString =>
	(uriString.split (term)).length % 2 ?
	uriString : uriString + term

const replaceInString = (string, replaceMap) =>
	Object.entries(replaceMap).reduce (
		(acc, val) => acc.split(val[0]).join(val[1]),
		string
	)