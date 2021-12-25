export const elem = ({tag = 'div', attr = {}, content = [], svg = false}) => {
	const result = svg ?
		document.createElementNS ('http://www.w3.org/2000/svg', tag) :
		document.createElement (tag)

	for (const name in attr) result.setAttribute(name, attr[name])

	void (type => 
		['string', 'number'].includes (type) ?
			result.innerText = content :
		type == 'object' && [content].flat ()
			.forEach(contEl => result.appendChild(contEl))
	) (typeof content)

	return result
}