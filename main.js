var rollout = (sequence, rule) => {
	let result = [sequence]
	do {
		sequence = rule.transform(sequence)
		result.push (sequence)
	} while (sequence.length >= rule.neighbors)
	return result
}

window.onhashchange = _ => {
	const uriObj = fromUri(location.hash)
	updateNav (uriObj)
	makeAll (uriObj)
}

var updateNav = config => {
	const {page} = config
	d.getElementById("prev").setAttribute("href", 
	toUri (O.assign({}, config, {page: page - 1})))
	d.getElementById("next").setAttribute("href", 
	toUri (O.assign({}, config, {page: page + 1})))
}

var setDefaults = config =>
	O.assign ({}, {amount: 16, page: 0, neighbors: 2, radix: 2, seed: "ts6"}, config)

var makeAll = config => {
	removeAll(["canvas", "svg"])
	let {neighbors, radix, start, end, page, amount, seed, render} = config
	start = start || page ? page * amount : 0;
	end = end || amount ? start + amount : Math.pow(radix, Math.pow(radix, neighbors))
	let count = start;
	do {
		const el = (render == "svg" ? displaySvg : displayCanvas)(rollout (seedGen(seed), new Rule(radix,neighbors,count)), config, count)
		d.body.appendChild(el)
	} while (++ count < end)
}

var removeAll = tags =>
	tags.forEach(tag =>
		Array.from(d.body.getElementsByTagName(tag))
		.forEach (el => d.body.removeChild(el))
	)