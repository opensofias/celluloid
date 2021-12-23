import { elem } from "./tools.js"

const hexColor = lightness => {
	lightness *= 511
	const hx = twoHex (lightness % 256)
	return lightness < 256 ?
	'#00' + hx + '00' :
	'#' + hx + 'FF' + hx
}

const twoHex = num => (num | 0).toString(16).padStart (2, '0')

const svgContext = svgElem => ({
	el: svgElem, fillStyle: undefined,
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

export const render = (history, config) => {
	const {radix, svg, ruleNum} = config
	const zoom = config.zoom || 2

	const el = elem ({
		tag: svg ? 'svg' : 'canvas',
		attr: {
			height: (history.length) * zoom,
			width: (history [0].length) * zoom,
			[svg ? 'xmlns' : 'title']:
				svg ? 'http://www.w3.org/2000/svg' : ruleNum
		},
		svg
	})

	const ctx = svg ? svgContext(el) : el.getContext('2d')

	el.addEventListener ('click',
		function () {
			open (svg ?
				'data:image/svg+xml;charset=utf8,<?xml version="1.0"?>' + this.outerHTML :
				this.toDataURL ()
	)})

	history.forEach ((row, rIndex) => {
		const shift = (history[0].length - row.length) / 2
		//row = row.split('')

		ctx.fillStyle = "#000"
		ctx.fillRect (
			shift * zoom,
			rIndex * zoom,
			zoom * row.length,
			zoom
		)

		let prevSymbol = row[0]
		let streak = 0

		row.forEach ((symbol, cIndex) => {
			if (symbol == prevSymbol) streak ++
			else {
				ctx.fillStyle = hexColor (Number.parseInt (prevSymbol, radix) / (radix - 1))
				Number.parseInt(prevSymbol) && ctx.fillRect (
					(shift + cIndex - streak) * zoom,
					rIndex * zoom,
					zoom * streak,
					zoom
				)
				prevSymbol = symbol
				streak = 1
		}})

		ctx.fillStyle = hexColor (Number.parseInt (prevSymbol, radix) / (radix - 1))
		Number.parseInt(prevSymbol) && ctx.fillRect (
			(row.length + shift - streak) * zoom,
			rIndex * zoom,
			zoom * streak,
			zoom
	)})
	return el
}
