'use strict'

// using "function" because of Edge bug
const elem = function ({tag = 'div', attr = {}, content = [], svg = false}) {
	const result = svg ?
		document.createElementNS ('http://www.w3.org/2000/svg', tag) :
		document.createElement (tag)

	for (const name in attr) result.setAttribute(name, attr[name])

	void {
		string: _ => result.innerText = content,
		number: _ => result.innerText = content.toString(),
		undefined: _ => 0,
		object: _ => content instanceof Array ?
			content.forEach(contEl => result.appendChild(contEl)) :
			result.appendChild(content)
	} [typeof content] ()

	return result
}

const range = (start, end, step = 1) => {
	let result = []

	// in case of one argument, 
	typeof end == 'undefined' &&
		([start, end] = [0, start -1])

	do {
		result.push (start)
		start += step
	} while (start != end)
	result.push (end)
	
	return result
}

const flatten = array =>
	array.reduce ((acc, child) =>
		acc.concat (
			Array.isArray (child) ?
			flatten (child) :
			child
		), []
	)

const flipObj = obj =>
	Object.keys(obj).reduce ((acc, key) =>
		(acc[obj[key]] = key) && acc
	, {})

const mod = (x, y) => (x % y + y) % y