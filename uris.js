"use strict"

//uri-friendly json notation

//var replace = (old, newer) =>

var toUri =
	obj =>
	'#' + encodeURI
	(
		JSON.stringify(obj)
		.slice(2,-1)
		.split(',"').join(',')
		.split('":').join(':')
		.split('"').join("'")
	)

var fromUri =
	uriString =>
	uriString.length <= 1 ? {} :
	JSON.parse
	(
		'{"' +
		decodeURI(uriString.slice(1))
		.split("'").join('"')
		.split(',').join(',"')
		.split(':').join('":')
		+ '}'
	)

