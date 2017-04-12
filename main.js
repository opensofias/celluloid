var rollout = (sequence, rule) =>
{
	let result = [sequence]
	do
	{
		sequence = rule.transform(sequence)
		result.push (sequence)
	}
	while (sequence.length >= rule.neighbors)
	return result
}

var block = rollout =>
{
	let el = document.createElement("div")
	el.innerHTML = rollout.join("<br/>")
	return el
}

window.onhashchange = _ =>
{
	let uriObj = fromUri(location.hash)
	makeAll (uriObj)
	updateNav (uriObj)
}

var updateNav = (uriObj) =>
{
	var {page} = uriObj
	document.getElementById("prev").setAttribute("href", 
	toUri (Object.assign({}, uriObj, {page: page - 1})))

	document.getElementById("next").setAttribute("href", 
	toUri (Object.assign({}, uriObj, {page: page + 1})))
}

var makeAll = (config) =>
{
	removeAll(["canvas", "svg"])
	let {neighbors, radix, start, end, page, amount, seed, render} = config
	start = start || page ? page * amount : 0;
	end = end || amount ? start + amount : Math.pow(radix, Math.pow(radix, neighbors))
	let count = start;
	do
	{
		const el = (render == "svg" ? displaySvg : displayCanvas)(rollout (seedGen(seed), new Rule(radix,neighbors,count)), config, count)
		document.body.appendChild(el)
	}
	while (++ count < end)
}

var removeAll = tags =>
	tags.forEach(tag =>
		Array.from(document.body.getElementsByTagName(tag))
		.forEach (el => document.body.removeChild(el))
	)