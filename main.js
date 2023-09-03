import { generateSeed } from "./seed.js"
import { rollout } from "./rule.js"
import { render } from "./render.js"
import { fromUri, toUri } from "./uris.js"
import { defaults } from "./defaults.js"

window.onload = window.onhashchange = _ => {
	location.hash.length <= 1 &&
		(console.log ('no pameters given, using defaults') ||
		(location.hash = toUri (setDefaults())))
	makeAll (setDefaults (fromUri (location.hash)))
}

const updateNav = config => {
	[['prev', -1], ['next', 1]].map (([id, offset]) =>
		document.getElementById(id).setAttribute('href',
			toUri ({...config, ...{page: config.page + offset}})
		)
	)
}

const setDefaults = (config = {}) => ({	...defaults, ...config })

const makeAll = config => {
	removeAll(['canvas', 'svg'])
	updateNav (config)
	let {neighbors, radix, start, end, page, amount, seed, only} = config
	start ??= only ?? (page ? page * amount : 0)
	end ??= (only ? only + 1 :
		(amount != -1) ? start + amount :
		radix ** (radix ** neighbors)
	)
	let ruleNum = start;
	const rolloutFun = rollout (config) (generateSeed (seed))
	do document.body.appendChild (
		render (
			rolloutFun (ruleNum),
			{ruleNum, __proto__: config}
		))
	while (++ ruleNum < end)
}

const removeAll = tags =>
	tags.forEach(tag =>
		Array.from(document.body.getElementsByTagName(tag))
		.forEach (el => document.body.removeChild(el))
	)