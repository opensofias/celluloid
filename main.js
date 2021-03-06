const rollout = (sequence, rule) => {
	let result = [sequence]
	do {
		sequence = rule.transform(sequence)
		result.push (sequence)
	} while (sequence.length >= rule.neighbors)
	return result
}

window.onload = window.onhashchange = _ => {
	location.hash.length <= 1 &&
		(location.hash = toUri (setDefaults({})))
	const uriObj = fromUri (location.hash)
	updateNav (uriObj)
	makeAll (uriObj)
}

const updateNav = config => {
	const {page} = config
	d.getElementById('prev').setAttribute('href',
	toUri (O.assign({}, config, {page: page - 1})))
	d.getElementById('next').setAttribute('href',
	toUri (O.assign({}, config, {page: page + 1})))
}

const setDefaults = config =>
	O.assign ({}, {amount: 16, page: 0, neighbors: 2, radix: 2, seed: 'ts6'}, config)

const makeAll = config => {
	removeAll(['canvas', 'svg'])
	let {neighbors, radix, start, end, page, amount, seed} = config
	start = start || page ? page * amount : 0;
	end = end || amount ? start + amount : Math.pow(radix, Math.pow(radix, neighbors))
	const computedSeed = generateSeed (seed)
	let ruleNum = start;
	do {
		const ruleConfig = O.assign(O.create(config), {ruleNum})
		const el = render (
			rollout (
				computedSeed,
				rule (ruleConfig)
			),
			ruleConfig
		)
		d.body.appendChild (el)
	} while (++ ruleNum < end)
}

const removeAll = tags =>
	tags.forEach(tag =>
		Array.from(d.body.getElementsByTagName(tag))
		.forEach (el => d.body.removeChild(el))
	)