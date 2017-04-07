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

var makeAll = (config) =>
{
	removeAll("svg")
	let {neighbors, radix, start, end, page, amount, seed} = config
	start = start || page ? page * amount : 0;
	end = end || amount ? start + amount : Math.pow(radix, Math.pow(radix, neighbors))
	let count = start;
	do
	{
		const svg = displaySvg(rollout (seedGen(seed), new Rule(radix,neighbors,count)),radix, count)
		document.body.appendChild(svg)
	}
	while (++ count < end)
}

var removeAll = tag => Array.from(document.body.getElementsByTagName(tag)).forEach (el => document.body.removeChild(el))