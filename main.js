import { generateSeed } from "./seed.js"
import { rule } from "./rule.js"
import { render } from "./render.js"

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
	document.getElementById('prev').setAttribute('href',
	toUri (Object.assign({}, config, {page: page - 1})))
	document.getElementById('next').setAttribute('href',
	toUri (Object.assign({}, config, {page: page + 1})))
}

const setDefaults = config =>
	Object.assign ({}, {amount: 16, page: 0, neighbors: 2, radix: 2, seed: 'ts6'}, config)

const makeAll = config => {
	removeAll(['canvas', 'svg'])
	let {neighbors, radix, start, end, page, amount, seed} = config
	start = start || page ? page * amount : 0;
	end = end || amount ? start + amount : Math.pow(radix, Math.pow(radix, neighbors))
	const computedSeed = generateSeed (seed)
	let ruleNum = start;
	do {
		const ruleConfig = Object.assign(Object.create(config), {ruleNum})
		const el = render (
			rollout (
				computedSeed,
				rule (ruleConfig)
			),
			ruleConfig
		)
		document.body.appendChild (el)
	} while (++ ruleNum < end)
}

const removeAll = tags =>
	tags.forEach(tag =>
		Array.from(document.body.getElementsByTagName(tag))
		.forEach (el => document.body.removeChild(el))
	)