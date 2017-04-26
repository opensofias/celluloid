"use strict"

//uri-friendly json notation

//var replace = (old, newer) =>

var toUriMap = {
	',"':',',
	'":':':',
	'"':"'"
}

var fromUriMap = {}
for (let key in toUriMap) fromUriMap[toUriMap[key]] = key

var fromUriMap2 =
	O.entries(toUriMap)
	.reduce ((acc, k_v) => 
			{acc[k_v[1]] = k_v[0]; return acc}
		, {}
	)

var toUri = obj =>
	'#' + encodeURI (
		JSON.stringify(obj)
		.slice(2,-1)
		.split(',"').join(',')
		.split('":').join(':')
		.split('"').join("'")
	)

var fromUri = uriString =>
	uriString.length <= 1 ? {} :
	JSON.parse (
		'{"' +
		decodeURI(uriString.slice(1))
		.split("'").join('"')
		.split(',').join(',"')
		.split(':').join('":')
		+ '}'
	)