import { flipObj } from "./tools.js"

//uri-friendly json notation

const uriMap = {
	',"':',',
	'":':':',
	'"':"'"
}

uriMap.from = flipObj (uriMap.to)

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
	JSON.parse (
		'{"' +
		replaceInString (decodeURI(uriString.slice(1)), uriMap.from) +
		'}'
	)

const replaceInString = (string, replaceMap) =>
	Object.entries(replaceMap).reduce (
		(acc, val) => acc.split(val[0]).join(val[1]),
		string
	)