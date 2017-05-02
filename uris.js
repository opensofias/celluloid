'use strict'

//uri-friendly json notation

const uriMap =
	{to: O.freeze ({
		',"':',',
		'":':':',
		'"':"'"
})}

uriMap.from = O.freeze (
	flipObj (uriMap.to)
	)

const toUri = obj =>
	'#' + encodeURI (
		replaceInString (
			JSON.stringify(obj)
			.slice(2,-1),
			uriMap.to
		)
	)

const fromUri = uriString =>
	uriString.length <= 1 ? {} :
	O.freeze (JSON.parse (
		'{"' +
		replaceInString (decodeURI(uriString.slice(1)), uriMap.from) +
		'}'
	))

const replaceInString = (string, replaceMap) =>
	O.entries(replaceMap).reduce (
		(acc, val) => acc.split(val[0]).join(val[1]),
		string
	)