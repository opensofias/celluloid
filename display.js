'use strict'

let hlsColor = lightness =>
	'hsl(120,100%,' + (100 * lightness | 0) + '%)'

let hexColor = lightness => {
	lightness *= 511
	const hx = twoHex (lightness % 256)
	return lightness < 256 ?
	'#00' + hx + '00' :
	'#' + hx + 'FF' + hx
}

let twoHex = num => {
	let out = (num | 0).toString(16)
	out.length <= 1 && (out = '0' + out)
	return out
}

const svgContext = svgElem => ({
	el: svgElem,
	fillStyle: undefined,
	fillRect (x, y, width, height) {
		this.el.appendChild(
			elem ({
				tag: 'rect',
				attr: {
					x, y, width, height,
					fill: this.fillStyle
				},
				svg: true
}))}})

var render = (rollout, config) => {
	var {radix, zoom, svg, ruleNum} = config
	zoom = zoom || 2

	const el = elem ({
		tag: svg ? 'svg' : 'canvas',
		attr: {
			height: (rollout.length) * zoom,
			width: (rollout[0].length) * zoom,
			[svg ? 'xmlns' : 'title']:
				svg ? 'http://www.w3.org/2000/svg' : ruleNum
		},
		svg
	})

	const ctx = svg ? svgContext(el) : el.getContext('2d')

	el.addEventListener ('click', svg ?
		function () {
			let url = 'data:image/svg+xml;charset=utf8,<?xml version="1.0"?>' + this.outerHTML
			window.open(url) } :
		function (ev) {open (this.toDataURL ())}
	)

	rollout.forEach ((row, rIndex) => {
		const shift = (rollout[0].length - row.length) / 2
		row = row.split('')
		let prevSymbol = row[0]
		let streak = 0

		row.forEach ((symbol, cIndex) => {
			if (symbol == prevSymbol) streak ++
			else if (streak) {
				ctx.fillStyle = hexColor(N.parseInt(prevSymbol, radix) / (radix - 1))
				ctx.fillRect (
					(shift + cIndex - streak) * zoom,
					rIndex * zoom,
					zoom * streak,
					zoom
				)
				prevSymbol = symbol
				streak = 1
		}})
		ctx.fillStyle = hexColor(N.parseInt(prevSymbol, radix) / (radix - 1))
		ctx.fillRect (
			(row.length + shift - streak) * zoom,
			rIndex * zoom,
			zoom * streak,
			zoom
	)})
	return el
}