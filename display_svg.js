"use strict"

let makeSVG = (tag, attribs = {}, append_to = false) =>
{
	let el = document.createElementNS("http://www.w3.org/2000/svg", tag)
	for (let key in attribs) el.setAttribute (key, attribs[key])
	append_to && append_to.appendChild(el)
	return el
}

let setAttribs = (target, array) =>
	array.forEach (attr => target.setAttribute (attr[0], attr[1]))

let zoom = 2

let color = lightness =>
"hsl(120,100%," + (100 * lightness | 0) + "%)"

let exportSvg = function ()
{
	let url = "data:image/svg+xml;charset=utf8,<?xml version=\"1.0\" standalone=\"no\"?>" + this.outerHTML
	window.open(url)
}

var displaySvg = (rollout, radix = 2, number) =>
{
	const el = makeSVG("svg",
	{
		height: (rollout.length) * zoom,
		width: (rollout[0].length) * zoom,
		version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
	})

	el.addEventListener("click", exportSvg)
	
	if (Number.isInteger(number))
	{
		const title = makeSVG ("title")
		title.innerHTML = number
		el.appendChild(title)
	}
	rollout.forEach ((row, rIndex) =>
	{
		const shift = (rollout[0].length - row.length) / 2
		row = row.split("")
		let prevSymbol = row[0]
		let streak = 0
		row.forEach ((symbol, cIndex) =>
		{
			if (symbol == prevSymbol) streak ++
			else if (streak)
			{
				el.appendChild (makeSVG ("rect",
				{
					x: (shift + cIndex - streak) * zoom,
					y: rIndex * zoom,
					height: zoom,
					width: zoom * streak,
					fill: "hsl(120,100%," + ((100 * Number.parseInt(prevSymbol, radix) / (radix - 1)) | 0) + "%)"
				}))
				prevSymbol = symbol
				streak = 1
			}
		})
		el.appendChild( makeSVG("rect",
		{
			x: (row.length + shift - streak) * zoom,
			y: rIndex * zoom,
			height: zoom,
			width: zoom * streak,
			fill: "hsl(120,100%," + ((100 * Number.parseInt(prevSymbol, radix) / (radix - 1)) | 0) + "%)"
		}))
	})
	return el
}
