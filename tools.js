'use strict'

const [O, A, N, d] = [Object, Array, Number, document].map(x => Object.freeze(x))

// using "function" because of Edge bug
const elem = function ({tag = 'div', attr = {}, content = [], svg = false}) {
	const el = svg ?
		d.createElementNS ('http://www.w3.org/2000/svg', tag) :
		d.createElement (tag)

	for (const name in attr) el.setAttribute(name, attr[name])

	! {
		string: _ => el.innerText = content,
		number: _ => el.innerText = content.toString(),
		undefined: _ => 0,
		object: _ => content instanceof Array ?
			content.forEach(contEl => el.appendChild(contEl)) :
			el.appendChild(content)
	} [typeof content] ()

	return el
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
			A.isArray (child) ?
			flatten (child) :
			child
		), []
	)

const flipObj = obj =>
	O.keys(obj).reduce ((acc, key) =>
		(acc[obj[key]] = key) && acc
	, {})

const mod = (x, y) => (x % y + y) % y