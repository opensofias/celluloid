'use strict'

//uri-friendly json notation

const toUriMap = O.freeze ({
	',"':',',
	'":':':',
	'"':"'"
})

const fromUriMap2 = O.freeze (
	O.entries(toUriMap)
	.reduce ((acc, k_v) => 
			{acc[k_v[1]] = k_v[0]; return acc}
		, {}
	))


const toUri = obj =>
	'#' + encodeURI (
		JSON.stringify(obj)
		.slice(2,-1)
		.split(',"').join(',')
		.split('":').join(':')
		.split('"').join("'")
	)

const fromUri = uriString =>
	uriString.length <= 1 ? {} :
	JSON.parse (
		'{"' +
		decodeURI(uriString.slice(1))
		.split("'").join('"')
		.split(',').join(',"')
		.split(':').join('":')
		+ '}'
	)

const replaceInString = (string, replaceMap) =>
	O.entries(replaceMap).reduce (
		(acc, val) => acc.split(val[0]).join(val[1]),
		string
	)