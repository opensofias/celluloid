'use strict'

export const elem = ({tag = 'div', attr = {}, content = [], svg = false}) => {
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

export const flipObj = obj =>
	Object.keys(obj).reduce ((acc, key) =>
		(acc[obj[key]] = key) && acc
	, {})

export const mod = (x, y) => (x % y + y) % y