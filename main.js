import { generateSeed } from "./seed.js"
import { rollout } from "./rule.js"
import { render } from "./render.js"
import { fromUri, toUri } from "./uris.js"

window.onload = window.onhashchange = _ => {
	location.hash.length <= 1 &&
		(location.hash = toUri (setDefaults({})))
	const uriObj = fromUri (location.hash)
	updateNav (uriObj)
	makeAll (uriObj)
}

const updateNav = config => {
	[['prev', -1], ['next', 1]].map (button =>
		document.getElementById(button[0]).setAttribute('href',
			toUri ({...config, ...{page: config.page + button [1]}})
		)
	)
}

const setDefaults = config => ({
	...{amount: 16, page: 0, neighbors: 2, radix: 2, seed: 'ts6', zoom: 2},
	...config
})

const makeAll = config => {
	removeAll(['canvas', 'svg'])
	let {neighbors, radix, start, end, page, amount, seed} = config
	start = start || page ? page * amount : 0;
	end = end || amount ? start + amount : radix ** (radix ** neighbors)
	let ruleNum = start;
	const rolloutFun = rollout (config) (generateSeed (seed))
	do {
		const el = render (
			rolloutFun (ruleNum),
			{ruleNum, __proto__: config}
		)
		document.body.appendChild (el)
	} while (++ ruleNum < end)
}

const removeAll = tags =>
	tags.forEach(tag =>
		Array.from(document.body.getElementsByTagName(tag))
		.forEach (el => document.body.removeChild(el))
	)